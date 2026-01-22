import React from 'react';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

interface StrapiBlockRendererProps {
    content: BlocksContent;
}

/**
 * Componente para renderizar contenido rico (Blocks) de Strapi v5.
 * Requiere instalar: npm install @strapi/blocks-react-renderer
 * 
 * Utiliza la clase 'prose' de Tailwind Typography para el estilizado automático.
 */
export default function StrapiBlockRenderer({ content }: StrapiBlockRendererProps) {
    if (!content) return null;

    return (
        <div className="prose prose-lg max-w-none dark:prose-invert">
            <BlocksRenderer
                content={content}
                blocks={{
                    // Puedes personalizar bloques específicos aquí si es necesario
                    image: ({ image }) => (
                        <img
                            src={image.url}
                            alt={image.alternativeText || ''}
                            className="rounded-lg shadow-md w-full h-auto object-cover my-6"
                        />
                    ),
                }}
            />
        </div>
    );
}
