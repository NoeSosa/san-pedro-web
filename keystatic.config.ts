// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: { kind: 'local' },
    collections: {
        // 1. COLECCIÓN DE TRADICIONES (Ya la tienes)
        tradiciones: collection({
            label: 'Tradiciones',
            slugField: 'title',
            path: 'src/content/tradiciones/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Título' } }),
                image: fields.image({
                    label: 'Imagen Principal',
                    directory: 'public/images/tradiciones',
                    publicPath: '/images/tradiciones/',
                }),
                description: fields.text({ label: 'Descripción Corta', multiline: true }),
                content: fields.document({
                    label: 'Contenido',
                    formatting: true,
                    dividers: true,
                    links: true,
                }),
            },
        }),

        // 2. NUEVA: COLECCIÓN DE ETIQUETAS (Categorías)
        etiquetas: collection({
            label: 'Etiquetas de Noticias',
            slugField: 'name',
            path: 'src/content/etiquetas/*',
            schema: {
                name: fields.slug({ name: { label: 'Nombre de la Etiqueta' } }),
                color: fields.select({
                    label: 'Color del Badge',
                    description: 'Elige un color para diferenciar esta categoría',
                    options: [
                        { label: 'Azul (Obras/Gobierno)', value: 'bg-blue-100 text-blue-800' },
                        { label: 'Verde (Ecología)', value: 'bg-green-100 text-green-800' },
                        { label: 'Morado (Mujer/DIF)', value: 'bg-purple-100 text-purple-800' },
                        { label: 'Naranja (Deportes)', value: 'bg-orange-100 text-orange-800' },
                        { label: 'Gris (General)', value: 'bg-gray-100 text-gray-800' },
                    ],
                    defaultValue: 'bg-blue-100 text-blue-800'
                })
            },
        }),

        // 3. NUEVA: COLECCIÓN DE NOTICIAS
        noticias: collection({
            label: 'Noticias',
            slugField: 'title',
            path: 'src/content/noticias/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Título de la Noticia' } }),
                date: fields.date({ label: 'Fecha de Publicación', validation: { isRequired: true } }),
                // Aquí está la magia: Relacionamos con las etiquetas
                tags: fields.relationship({
                    label: 'Etiqueta / Categoría',
                    collection: 'etiquetas',
                }),
                isFeatured: fields.checkbox({
                    label: '¿Destacar en el Grid Principal?',
                    description: 'Si marcas esto, aparecerá en el mosaico grande de arriba.'
                }),
                image: fields.image({
                    label: 'Imagen Destacada',
                    directory: 'public/images/noticias',
                    publicPath: '/images/noticias/',
                }),
                excerpt: fields.text({ label: 'Resumen (aparece en la tarjeta)', multiline: true }),
                content: fields.document({
                    label: 'Cuerpo de la Noticia',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: true,
                }),
            },
        }),
    },
});