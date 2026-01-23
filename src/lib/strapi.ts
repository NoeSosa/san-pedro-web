interface FetchApiProps {
    endpoint: string;
    query?: Record<string, any>;
    token?: string;
}

/**
 * Helper to stringify nested objects for Strapi query params.
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
                    return `${newKey}[${i}]=${encodeURIComponent(v)}`;
                }).join('&');
            } else {
                return `${newKey}=${encodeURIComponent(value)}`;
            }
        })
        .filter(Boolean)
        .join('&');
}

/**
 * Core fetch wrapper for Strapi v5 API.
 */
export async function fetchApi<T>({
    endpoint,
    query,
    token,
}: FetchApiProps): Promise<T> {
    // LOGICA NUEVA:
    // Si estamos en el servidor (SSR), usamos la IP interna (STRAPI_URL).
    // Si estamos en el cliente, usamos la pública (PUBLIC_STRAPI_URL).
    // Si no hay ninguna, fallback a localhost.
    const internalUrl = import.meta.env.STRAPI_URL || import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';

    // Quitamos la barra final si existe
    const baseUrl = internalUrl.replace(/\/$/, '');

    const apiToken = token || import.meta.env.STRAPI_API_TOKEN;

    // Normalize endpoint
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

    const queryString = query ? stringifyQuery(query) : '';
    const url = `${baseUrl}/api/${cleanEndpoint}${queryString ? `?${queryString}` : ''}`;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (apiToken) {
        headers['Authorization'] = `Bearer ${apiToken}`;
    }

    try {
        // console.log(`Fetching internal URL: ${url}`); // Descomenta si necesitas depurar
        const res = await fetch(url, { headers });

        if (!res.ok) {
            let errorMessage = `Error fetching ${url}: ${res.statusText} (${res.status})`;
            try {
                const errorData = await res.json();
                if (errorData?.error?.message) {
                    errorMessage = `Strapi Error: ${errorData.error.message}`;
                }
            } catch {
                // Ignore non-JSON errors
            }
            throw new Error(errorMessage);
        }

        const data = await res.json();
        return data as T;
    } catch (error) {
        console.error(`❌ API Fetch Error [${endpoint}]:`, error);
        throw error;
    }
}

/**
 * Resolves the absolute URL for a Strapi media asset.
 * SIEMPRE usa la URL PÚBLICA porque esto lo ve el usuario.
 */
export function getStrapiMedia(url: string | null | undefined): string | null {
    if (!url) return null;

    // Check if it's already an absolute URL
    if (url.startsWith('http') || url.startsWith('//')) {
        return url;
    }

    // AQUI SIEMPRE USAMOS LA URL PUBLICA (https://admin...)
    const baseUrl = (import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '');
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;

    return `${baseUrl}${cleanUrl}`;
}