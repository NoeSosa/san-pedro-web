import React from 'react';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

interface StrapiBlockRendererProps {
    content: BlocksContent;
}

/**
 * Renders Strapi v5 "Blocks" (Rich Text) using Tailwind Typography.
 * This component is an "Island" candidate if interactivity is needed, 
 * but usually renders static HTML.
 */
export default function StrapiBlockRenderer({ content }: StrapiBlockRendererProps) {
    if (!content) return null;

    return (
        <div className="prose prose-lg max-w-none dark:prose-invert 
      prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
      prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500
      prose-img:rounded-xl prose-img:shadow-lg">
            <BlocksRenderer
                content={content}
                blocks={{
                    image: ({ image }) => (
                        <img
                            src={image.url}
                            alt={image.alternativeText || ''}
                            className="w-full h-auto object-cover my-8"
                            loading="lazy"
                        />
                    ),
                    link: ({ children, url }) => (
                        <a href={url} className="underline decoration-2 underline-offset-2 transition-colors">
                            {children}
                        </a>
                    ),
                }}
            />
        </div>
    );
}
