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

// Esquema para Documentos de Transparencia
const documentos = defineCollection({
    type: 'data', // Usamos 'data' porque son archivos JSON con info del PDF, no artículos largos
    schema: z.object({
        titulo: z.string(),
        fecha: z.string().or(z.date()).transform((val) => new Date(val)),
        categoria: z.string(),
        archivo: z.string(), // Esto guardará la ruta "/documentos/mi-archivo.pdf"
        descripcion: z.string().optional(),
    })
});

export const collections = { tradiciones, etiquetas, noticias, documentos };