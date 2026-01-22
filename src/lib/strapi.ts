interface FetchApiProps {
    endpoint: string;
    query?: Record<string, any>;
    token?: string;
}

/**
 * Convierte un objeto anidado en una cadena de consulta compatible con Strapi.
 * Ejemplo: { filters: { slug: { $eq: 'abc' } } } -> "filters[slug][$eq]=abc"
 */
function stringifyQuery(query: Record<string, any>, prefix = ''): string {
    return Object.keys(query)
        .map((key) => {
            const value = query[key];
            const newKey = prefix ? `${prefix}[${key}]` : key;

            if (value === null || value === undefined) {
                return '';
            } else if (typeof value === 'object' && !Array.isArray(value)) {
                return stringifyQuery(value, newKey);
            } else if (Array.isArray(value)) {
                return value.map((v, i) => {
                    // Strapi v5 array handling might vary, but usually repeated keys or indexed keys work.
                    // For simplicity in filters, often just repeating works or using $in.
                    // We'll assume standard repeating keys for arrays if needed, or indexed.
                    // Safe bet for Strapi is usually `key[0]=val&key[1]=val` for some things,
                    // but strictly standard URLSearchParams repeats keys.
                    // Let's stick to a simple recursive object expansion which covers 99% of Strapi queries.
                    return `${newKey}[${i}]=${encodeURIComponent(v)}`;
                }).join('&');
            } else {
                return `${newKey}=${encodeURIComponent(value)}`;
            }
        })
        .filter(Boolean)
        .join('&');
}

export async function fetchApi<T>({
    endpoint,
    query,
    token,
}: FetchApiProps): Promise<T> {
    const baseUrl = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const apiToken = token || import.meta.env.STRAPI_API_TOKEN;

    if (endpoint.startsWith('/')) {
        endpoint = endpoint.slice(1);
    }

    const queryString = query ? stringifyQuery(query) : '';
    const url = `${baseUrl}/api/${endpoint}${queryString ? `?${queryString}` : ''}`;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (apiToken) {
        headers['Authorization'] = `Bearer ${apiToken}`;
    }

    try {
        const res = await fetch(url, { headers });

        if (!res.ok) {
            // Intenta obtener detalles del error de Strapi
            let errorMessage = `Error fetching ${url}: ${res.statusText} (${res.status})`;
            try {
                const errorData = await res.json();
                if (errorData?.error?.message) {
                    errorMessage = `Strapi Error: ${errorData.error.message}`;
                }
            } catch {
                // Ignorar si no es JSON
            }
            throw new Error(errorMessage);
        }

        const data = await res.json();
        return data as T;
    } catch (error) {
        console.error('❌ API Fetch Error:', error);
        throw error;
    }
}

/**
 * Obtiene la URL absoluta de un recurso multimedia de Strapi.
 * Maneja casos nulos o indefinidos.
 */
export function getStrapiMedia(url: string | null | undefined): string | null {
    if (!url) return null;

    // Si ya es una URL absoluta (ej: Cloudinary, AWS S3), devolverla tal cual
    if (url.startsWith('http') || url.startsWith('//')) {
        return url;
    }

    // Si es relativa, concatenar con la URL base de Strapi
    const baseUrl = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

    // Asegurar que no haya doble slash
    const cleanBase = baseUrl.replace(/\/$/, '');
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;

    return `${cleanBase}${cleanUrl}`;
}
