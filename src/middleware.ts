import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    // Middleware limpio para futuras implementaciones de seguridad o lógica global.
    // Anteriormente manejaba la autenticación de Keystatic.

    const response = await next();
    return response;
});
