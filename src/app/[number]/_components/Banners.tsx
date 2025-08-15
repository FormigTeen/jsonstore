"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Slide = { src: string; alt: string };
type BannersProps = {
    slides?: Slide[];
    className?: string;
    fit?: "contain" | "cover"; // controla o corte
};

const defaultSlides: Slide[] = [
    { src: "https://gramstore.com.br/storage/175636/gramstore-banner-05.png", alt: "teste 0123" },
    { src: "https://gramstore.com.br/storage/175640/gramstore-banner-04.png", alt: "Banner 03" },
];

export default function Banners({
                                    slides = defaultSlides,
                                    className = "",
                                    fit = "contain",
                                }: BannersProps) {
    return (
        <section className={`py-0 mb-4 ${className}`}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Swiper
                            modules={[Navigation, Pagination, A11y, Autoplay]}
                            slidesPerView={1}
                            spaceBetween={16}
                            loop
                            pagination={{ clickable: true }}
                            navigation
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            autoHeight // ajusta a altura conforme a imagem para não cortar
                            style={{ paddingBottom: 24 }}
                        >
                            {slides.map((s, i) => (
                                <SwiperSlide key={i} className="mb-5">
                                    <figure className="mb-0">
                                        <article>
                                            <div className="article-inner rounded">
                                                {fit === "cover" ? (
                                                    // MODO COVER (preenche e pode cortar)
                                                    <div
                                                        className="rounded position-relative overflow-hidden w-100"
                                                        style={{ aspectRatio: "3.4 / 1" }} // ajuste se quiser
                                                    >
                                                        <Image
                                                            src={s.src}
                                                            alt={s.alt}
                                                            fill
                                                            sizes="(min-width: 768px) 710px, 100vw"
                                                            style={{ objectFit: "cover", objectPosition: "center" }}
                                                            priority={i === 0}
                                                        />
                                                    </div>
                                                ) : (
                                                    // MODO CONTAIN (mostra inteiro, sem corte)
                                                    <div className="w-100 d-flex justify-content-center">
                                                        <Image
                                                            src={s.src}
                                                            alt={s.alt}
                                                            width={1920} // qualquer largura grande o suficiente
                                                            height={600} // altura proporcional ao seu banner
                                                            className="img-fluid w-100 h-auto"
                                                            style={{ objectFit: "contain" }}
                                                            priority={i === 0}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </article>
                                    </figure>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}
