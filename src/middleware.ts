import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    if (context.url.pathname.startsWith("/keystatic") || context.url.pathname.startsWith("/api/keystatic")) {

        const basicAuth = context.request.headers.get("authorization");

        if (basicAuth) {
            const authValue = basicAuth.split(" ")[1];
            const [user, pwd] = atob(authValue).split(":");

            // --- ZONA DE DEBUGGING (Bórralo cuando funcione) ---
            console.log("------------------------------------------------");
            console.log("INTENTO DE ACCESO DETECTADO:");
            console.log(`Usuario recibido: '${user}'`);
            console.log(`Contraseña recibida: '${pwd}'`);
            console.log(`Usuario esperado (.env): '${process.env.ADMIN_USER}'`);
            console.log(`Contraseña esperada (.env): '${process.env.ADMIN_PASSWORD}'`);
            console.log("------------------------------------------------");
            // ----------------------------------------------------

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

    return next();
});