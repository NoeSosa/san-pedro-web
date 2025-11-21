// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite'; // ESTE ES EL BUENO (V4)
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';

// 1. BORRA la línea que importaba "@astrojs/tailwind" (Línea 10 en tu foto)

export default defineConfig({
  vite: {
    plugins: [tailwindcss()] // Esto es lo que hace que Tailwind funcione ahora
  },

  integrations: [
    // 2. BORRA la línea "tailwind()," de aquí abajo
    react(),
    keystatic(),
    markdoc()
  ],

  output: 'static'
});