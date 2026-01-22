// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite'; // ESTE ES EL BUENO (V4)
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';

import node from '@astrojs/node';


export default defineConfig({

  site: 'https://sanpedrohuamelula.pro',

  vite: {
    plugins: [tailwindcss()] // Esto es lo que hace que Tailwind funcione ahora
  },

  integrations: [
    react(),
    markdoc()
  ],

  output: 'server',

  adapter: node({
    mode: 'standalone'
  })
});