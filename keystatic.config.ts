// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

const isGithubMode = import.meta.env.PUBLIC_KEYSTATIC_MODE === 'github';

export default config({
    storage: isGithubMode
        ? {
            kind: 'github',
            repo: {
                owner: 'NoeSosa',       // Tu usuario de GitHub
                name: 'san-pedro-web',  // Tu repositorio
            },
        }
        : {
            kind: 'local',
        },
    collections: {
        // 1. COLECCIÓN DE TRADICIONES
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

        // 2. COLECCIÓN DE ETIQUETAS (Categorías)
        etiquetas: collection({
            label: 'Etiquetas de Noticias',
            slugField: 'name',
            path: 'src/content/etiquetas/*',
            schema: {
                name: fields.slug({ name: { label: 'Nombre de la Etiqueta' } }),
                color: fields.select({
                    label: 'Color de la Etiqueta',
                    description: 'Elige un color para diferenciar esta categoría visualmente.',
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

        // 3. COLECCIÓN DE NOTICIAS
        noticias: collection({
            label: 'Noticias',
            slugField: 'title',
            path: 'src/content/noticias/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Título de la Noticia' } }),
                date: fields.date({ label: 'Fecha de Publicación', validation: { isRequired: true } }),
                // Relación con etiquetas
                tags: fields.relationship({
                    label: 'Categoría / Etiqueta',
                    collection: 'etiquetas',
                }),
                isFeatured: fields.checkbox({
                    label: '¿Destacar en Portada?',
                    description: 'Si se activa, esta noticia aparecerá en la sección principal de inicio.'
                }),
                image: fields.image({
                    label: 'Imagen Destacada',
                    directory: 'public/images/noticias',
                    publicPath: '/images/noticias/',
                }),
                excerpt: fields.text({
                    label: 'Resumen',
                    description: 'Texto breve que aparecerá en la tarjeta de la noticia.',
                    multiline: true
                }),
                content: fields.document({
                    label: 'Cuerpo de la Noticia',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: true,
                }),
            },
        }),

        // 4. COLECCIÓN DE DOCUMENTOS DE TRANSPARENCIA
        documentos: collection({
            label: 'Transparencia (Documentos)',
            slugField: 'titulo',
            path: 'src/content/documentos/*',
            schema: {
                titulo: fields.slug({ name: { label: 'Nombre del Documento' } }),
                fecha: fields.date({ label: 'Fecha de Publicación', validation: { isRequired: true } }),
                categoria: fields.select({
                    label: 'Categoría',
                    options: [
                        { label: 'Actas de Cabildo', value: 'actas' },
                        { label: 'Finanzas y Cuenta Pública', value: 'finanzas' },
                        { label: 'Obras Públicas', value: 'obras' },
                        { label: 'Reglamentos y Leyes', value: 'normatividad' },
                        { label: 'Otros', value: 'otros' },
                    ],
                    defaultValue: 'actas'
                }),
                archivo: fields.file({
                    label: 'Archivo Digital (PDF)',
                    directory: 'public/documentos',
                    publicPath: '/documentos/',
                    validation: { isRequired: true }
                }),
                descripcion: fields.text({ label: 'Descripción Adicional (Opcional)' })
            },
        }),
    },
});