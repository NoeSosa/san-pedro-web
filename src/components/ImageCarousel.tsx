import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface ImageData {
    url: string;
    alt: string;
    width: number;
    height: number;
}

interface ImageCarouselProps {
    images: ImageData[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
    if (!images || images.length === 0) {
        return null;
    }

    // Si solo hay una imagen, mostrarla sin carrusel
    if (images.length === 1) {
        return (
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gray-100 dark:bg-gray-800">
                <img
                    src={images[0].url}
                    alt={images[0].alt}
                    className="w-full h-full object-cover"
                    loading="eager"
                />
            </div>
        );
    }

    // Carrusel para múltiples imágenes
    return (
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    el: '.swiper-pagination-custom',
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                loop={images.length > 2}
                effect="fade"
                fadeEffect={{
                    crossFade: true,
                }}
                className="image-carousel"
                style={{ aspectRatio: '16/9' }}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full bg-gray-900">
                            <img
                                src={image.url}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                loading={index === 0 ? 'eager' : 'lazy'}
                            />
                            {/* Overlay sutil para mejor contraste */}
                            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Botones de navegación personalizados */}
            <button
                className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 group"
                aria-label="Imagen anterior"
            >
                <svg
                    className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            <button
                className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 group"
                aria-label="Siguiente imagen"
            >
                <svg
                    className="w-6 h-6 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

            {/* Paginación personalizada */}
            <div className="swiper-pagination-custom absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2" />

            {/* Contador de imágenes */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full text-white text-sm font-medium">
                <span className="swiper-counter">1</span> / {images.length}
            </div>

            <style jsx>{`
                :global(.image-carousel .swiper-pagination-bullet) {
                    width: 10px;
                    height: 10px;
                    background: white;
                    opacity: 0.6;
                    transition: all 0.3s;
                }

                :global(.image-carousel .swiper-pagination-bullet-active) {
                    opacity: 1;
                    width: 32px;
                    border-radius: 5px;
                    background: linear-gradient(90deg, #3b82f6, #2563eb);
                }

                :global(.image-carousel .swiper-slide-active .swiper-counter)::before {
                    content: attr(data-swiper-slide-index);
                }
            `}</style>
        </div>
    );
}
