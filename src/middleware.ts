import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {

    // --- ZONA DE ESPIONAJE (Diagnóstico) ---
    if (context.url.pathname.startsWith("/api/keystatic")) {
        console.log("------------------------------------------------");
        console.log("📍 URL:", context.url.href);
        // ESTO ES LO NUEVO: ¿Trae cookies el navegador?
        const cookies = context.request.headers.get("cookie");
        if (cookies) {
            console.log("🍪 COOKIES RECIBIDAS:", cookies);
        } else {
            console.log("❌ ALERTA: El navegador NO envió ninguna cookie (Sesión perdida)");
        }
        console.log("------------------------------------------------");
    }
    // ---------------------------------------

    // 1. Identificamos si es el panel visual
    const isDashboard = context.url.pathname.startsWith("/keystatic");

    // 2. Identificamos si es la API interna (donde entra GitHub)
    // ESTO ES LO QUE TE FALTABA EXCLUIR
    const isApi = context.url.pathname.startsWith("/api/keystatic");

    // LÓGICA CORREGIDA:
    // Solo pedimos contraseña si es el Dashboard Y NO es la API.
    // Dejamos la puerta abierta (/api) para que GitHub complete el login.
    if (isDashboard && !isApi) {

        const basicAuth = context.request.headers.get("authorization");

        if (basicAuth) {
            const authValue = basicAuth.split(" ")[1];
            const [user, pwd] = atob(authValue).split(":");

            if (user === process.env.ADMIN_USER && pwd === process.env.ADMIN_PASSWORD) {
                return next();
            }
        }

        return new Response("Acceso denegado", {
            status: 401,
            headers: {
                "WWW-Authenticate": 'Basic realm="Admin Area"',
            },
        });
    }

    // ============================================================
    // AQUÍ ESTÁ EL CAMBIO IMPORTANTE (AL FINAL)
    // ============================================================

    // 1. Ejecutamos la petición original
    const response = await next();

    // --- DIAGNÓSTICO FINAL ---
    if (context.url.pathname.startsWith("/api/keystatic/github/login")) {
        console.log("------------------------------------------------");
        console.log("🔍 INSPECCIONANDO SALIDA DE /LOGIN");

        // Verificamos si Keystatic intentó poner alguna cookie
        const cookiesSalida = response.headers.getSetCookie(); // Obtiene todas las cookies

        if (cookiesSalida.length > 0) {
            console.log("✅ ¡EUREKA! Keystatic generó estas cookies:", cookiesSalida);
        } else {
            console.log("❌ ERROR CRÍTICO: Keystatic NO generó ninguna cookie de sesión.");
            console.log("   Posibles causas: Secret inválido o Modo incorrecto.");
        }

        // Mantenemos la cookie testigo para verificar que Nginx no borre cosas
        response.headers.append(
            "Set-Cookie",
            "TEST_COOKIE=testigo; Path=/; HttpOnly; SameSite=Lax; Secure"
        );
        console.log("------------------------------------------------");
    }
    // -------------------------

    return response;
});
