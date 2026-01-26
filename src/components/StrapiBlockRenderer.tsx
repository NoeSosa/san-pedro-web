import React from 'react';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import { getStrapiMedia } from '../lib/strapi';

interface StrapiBlockRendererProps {
    content: BlocksContent;
}

/**
 * Renders Strapi v5 "Blocks" (Rich Text) using Tailwind Typography.
 * This component handles all rich text content from Strapi including
 * paragraphs, headings, lists, images, links, etc.
 */
export default function StrapiBlockRenderer({ content }: StrapiBlockRendererProps) {
    if (!content) {
        return (
            <div className="text-gray-400 italic text-center py-8">
                No hay contenido disponible.
            </div>
        );
    }

    return (
        <div className="prose prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-6
            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-5
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:text-blue-800 hover:prose-a:underline
            prose-img:rounded-2xl prose-img:shadow-xl prose-img:border prose-img:border-gray-100
            prose-ul:my-6 prose-ol:my-6
            prose-li:text-gray-700 prose-li:my-2
            prose-strong:text-gray-900 prose-strong:font-bold
            prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:italic">
            <BlocksRenderer
                content={content}
                blocks={{
                    image: ({ image }) => {
                        const imageUrl = getStrapiMedia(image.url);
                        if (!imageUrl) return null;

                        return (
                            <figure className="my-8">
                                <img
                                    src={imageUrl}
                                    alt={image.alternativeText || 'Imagen'}
                                    className="w-full h-auto object-cover rounded-2xl shadow-xl border border-gray-100"
                                    loading="lazy"
                                />
                                {image.caption && (
                                    <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
                                        {image.caption}
                                    </figcaption>
                                )}
                            </figure>
                        );
                    },
                    link: ({ children, url }) => (
                        <a
                            href={url}
                            className="text-blue-600 font-semibold no-underline hover:text-blue-800 hover:underline transition-all duration-200"
                            target={url.startsWith('http') ? '_blank' : undefined}
                            rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                            {children}
                        </a>
                    ),
                    paragraph: ({ children }) => (
                        <p className="text-gray-700 leading-relaxed mb-4">
                            {children}
                        </p>
                    ),
                    heading: ({ children, level }) => {
                        const Tag = `h${level}` as keyof JSX.IntrinsicElements;
                        const classes = {
                            1: 'text-4xl font-bold text-gray-900 mb-6 mt-8',
                            2: 'text-3xl font-bold text-gray-900 mb-4 mt-6',
                            3: 'text-2xl font-bold text-gray-900 mb-3 mt-5',
                            4: 'text-xl font-bold text-gray-900 mb-2 mt-4',
                            5: 'text-lg font-bold text-gray-900 mb-2 mt-3',
                            6: 'text-base font-bold text-gray-900 mb-2 mt-2',
                        };

                        return (
                            <Tag className={classes[level as keyof typeof classes]}>
                                {children}
                            </Tag>
                        );
                    },
                    list: ({ children, format }) => {
                        const Tag = format === 'ordered' ? 'ol' : 'ul';
                        return (
                            <Tag className={`my-6 ${format === 'ordered' ? 'list-decimal' : 'list-disc'} pl-6 space-y-2`}>
                                {children}
                            </Tag>
                        );
                    },
                    'list-item': ({ children }) => (
                        <li className="text-gray-700">
                            {children}
                        </li>
                    ),
                    quote: ({ children }) => (
                        <blockquote className="border-l-4 border-blue-600 bg-blue-50 py-3 px-5 my-6 italic text-gray-700">
                            {children}
                        </blockquote>
                    ),
                    code: ({ children }) => (
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
                            <code>{children}</code>
                        </pre>
                    ),
                }}
            />
        </div>
    );
}
