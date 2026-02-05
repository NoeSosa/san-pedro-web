import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { getStrapiMedia } from '../lib/strapi';
import type { StrapiData, TradicionAttributes } from '../interfaces/strapi';
import type { BlocksContent } from '@strapi/blocks-react-renderer';

// Estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TraditionCarouselProps {
    tradiciones: StrapiData<TradicionAttributes>[];
}

// Helper function to extract plain text from BlocksContent
const extractTextFromBlocks = (blocks: BlocksContent): string => {
    if (!blocks || !Array.isArray(blocks)) return '';

    let text = '';
    for (const block of blocks) {
        if (block.children && Array.isArray(block.children)) {
            for (const child of block.children) {
                if (child.type === 'text' && child.text) {
                    text += child.text + ' ';
                }
            }
        }
    }
    return text.trim();
};

export default function TraditionCarousel({ tradiciones }: TraditionCarouselProps) {
    if (!tradiciones || tradiciones.length === 0) {
        return null;
    }

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}
            className="w-full py-10 px-4 tradition-swiper"
        >
            {tradiciones.map((tradicion) => {
                const { titulo, slug, descripcion, imagen_principal } = tradicion;

                // Extraemos la primera imagen del array (ya que Strapi devuelve un array)
                const imgData = imagen_principal?.[0];

                // Determinamos qué formato usar (medium o original) para obtener URL y dimensiones consistentes
                const imgFormat = imgData?.formats?.medium || imgData;
                const imageUrl = getStrapiMedia(imgFormat?.url);
                const imgWidth = imgFormat?.width;
                const imgHeight = imgFormat?.height;

                // Extraer texto plano de la descripción (que puede ser string o BlocksContent)
                let descripcionTexto = '';
                if (typeof descripcion === 'string') {
                    descripcionTexto = descripcion;
                } else if (Array.isArray(descripcion)) {
                    descripcionTexto = extractTextFromBlocks(descripcion as unknown as BlocksContent);
                }

                return (
                    <SwiperSlide key={tradicion.documentId || tradicion.id} className="pb-12">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden h-full border border-gray-100 dark:border-gray-700 flex flex-col hover:shadow-2xl transition-shadow duration-300">
                            <div className="h-56 overflow-hidden relative group">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={titulo}
                                        width={imgWidth}
                                        height={imgHeight}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                        <span className="text-gray-400">Sin imagen</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1">
                                    {titulo}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow line-clamp-3">
                                    {descripcionTexto || 'Descubre más sobre esta tradición...'}
                                </p>
                                <a
                                    href={`/tradiciones/${slug}`}
                                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline mt-auto"
                                >
                                    Descubrir más
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </a>
                            </div>
                        </div>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}
