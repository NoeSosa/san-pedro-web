// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite'; // ESTE ES EL BUENO (V4)
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import markdoc from '@astrojs/markdoc';

import node from '@astrojs/node';


export default defineConfig({
  vite: {
    plugins: [tailwindcss()] // Esto es lo que hace que Tailwind funcione ahora
  },

  integrations: [
    react(),
    keystatic(),
    markdoc()
  ],

  output: 'static',

  adapter: node({
    mode: 'standalone'
  })
});