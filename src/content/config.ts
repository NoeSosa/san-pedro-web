// src/content/config.ts
import { defineCollection, reference, z } from 'astro:content';

const tradiciones = defineCollection({
    type: 'content', // Son archivos de texto (Markdown/MDX)
    schema: z.object({
        title: z.string(),
        image: z.string(),
        description: z.string(),
    }),
});
// Esquema para Etiquetas
const etiquetas = defineCollection({
    type: 'data', // 'data' porque son archivos JSON/YAML pequeños, no artículos largos
    schema: z.object({
        name: z.string(),
        color: z.string(),
    })
});

// Esquema para Noticias
const noticias = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.string().or(z.date()).transform((val) => new Date(val)), // Asegura que sea fecha
        tags: reference('etiquetas').optional(), // Relación con la colección etiquetas
        isFeatured: z.boolean().default(false),
        image: z.string(),
        excerpt: z.string(),
    })
});

export const collections = { tradiciones, etiquetas, noticias };