import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function TraditionCarousel({ tradiciones }) {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}
            className="w-full py-10 px-4"
        >
            {tradiciones.map((tradicion) => (
                <SwiperSlide key={tradicion.slug} className="pb-12">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full border border-gray-100 flex flex-col">
                        <div className="h-48 overflow-hidden relative">
                            <img
                                src={tradicion.data.image}
                                alt={tradicion.data.title}
                                className="w-full h-full object-cover hover:scale-110 transition duration-500"
                            />
                        </div>
                        <div className="p-6 flex-grow flex flex-col">
                            <h3 className="text-xl font-bold text-blue-900 mb-2">{tradicion.data.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 flex-grow">{tradicion.data.description}</p>
                            <a
                                href={`/tradiciones/${tradicion.slug}`}
                                className="text-yellow-600 font-bold text-sm hover:underline"
                            >
                                Leer más &rarr;
                            </a>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}