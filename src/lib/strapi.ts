interface FetchApiProps {
    endpoint: string;
    query?: Record<string, any>;
    token?: string;
}

function stringifyQuery(query: Record<string, any>, prefix = ''): string {
    return Object.keys(query)
        .map((key) => {
            const value = query[key];
            const newKey = prefix ? `${prefix}[${key}]` : key;
            if (value === null || value === undefined) return '';
            else if (typeof value === 'object' && !Array.isArray(value)) return stringifyQuery(value, newKey);
            else if (Array.isArray(value)) return value.map((v, i) => `${newKey}[${i}]=${encodeURIComponent(v)}`).join('&');
            else return `${newKey}=${encodeURIComponent(value)}`;
        })
        .filter(Boolean).join('&');
}

export async function fetchApi<T>({ endpoint, query, token }: FetchApiProps): Promise<T> {
    // 1. LEER VARIABLES (Con limpieza de espacios)
    const envStrapiUrl = process.env['STRAPI_URL']?.trim(); 
    const publicStrapiUrl = import.meta.env.PUBLIC_STRAPI_URL?.trim();
    
    // 2. LOG DE DEPURACIÓN (Míralo en 'docker logs san_pedro_frontend')
    console.log('🔍 [Strapi Debug] Variables:', { 
        envStrapiUrl, 
        publicStrapiUrl,
        finalDecision: envStrapiUrl || publicStrapiUrl || 'http://localhost:1337'
    });

    // 3. SELECCIÓN DE URL (Prioridad: Interna -> Pública -> Localhost)
    const internalUrl = envStrapiUrl || publicStrapiUrl || 'http://localhost:1337';
    const baseUrl = internalUrl.replace(/\/$/, '');
    
    const apiToken = token || import.meta.env.STRAPI_API_TOKEN;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const queryString = query ? stringifyQuery(query) : '';
    
    // 4. CONSTRUCCIÓN FINAL
    const url = `${baseUrl}/api/${cleanEndpoint}${queryString ? `?${queryString}` : ''}`;

    // Validar esquema antes de lanzar el fetch para evitar el error "unknown scheme"
    if (!url.startsWith('http')) {
        console.error(`❌ [Strapi Error] URL inválida (falta http): ${url}`);
        throw new Error(`URL inválida configurada: ${url}`);
    }

    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (apiToken) headers['Authorization'] = `Bearer ${apiToken}`;

    try {
        console.log(`🚀 [Fetch] Intentando conectar a: ${url}`);
        const res = await fetch(url, { headers });

        if (!res.ok) {
            let errorMessage = `Error fetching ${url}: ${res.statusText} (${res.status})`;
            try {
                const errorData = await res.json();
                if (errorData?.error?.message) errorMessage = `Strapi Error: ${errorData.error.message}`;
            } catch {}
            throw new Error(errorMessage);
        }

        return await res.json() as T;
    } catch (error) {
        console.error(`❌ API Fetch Error [${endpoint}]:`, error);
        throw error;
    }
}

export function getStrapiMedia(url: string | null | undefined): string | null {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('//')) return url;
    
    // Para imágenes siempre usamos la pública
    const baseUrl = (import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '');
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${baseUrl}${cleanUrl}`;
}