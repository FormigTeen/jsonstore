"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Product} from "@/app/services/stores";

type Slide = { src: string; alt: string };

type GalleryProps = {
    product: Product;
    slides?: Slide[];
    className?: string;
    aspectRatio?: string;          // usado apenas no modo "cover"
    fit?: "contain" | "cover";     // "contain" = não corta (padrão)
};

export default function Gallery({
                                    className = "",
                                    product,
                                    aspectRatio = "16 / 9",
                                    fit = "contain",
                                }: GalleryProps) {

    const slides = product.imagesUrl.map(url => ({
        src: url,
        alt: product.title || "Imagem do produto",
    }))

    return (
        <section className={`no-padding py-1 mb-4 ${className}`}>
            <div className="container-fluid">
                <div className="row gx-0">
                    <div className="col-md-6 offset-md-3 col-12 p-0">
                        <Swiper
                            modules={[Navigation, Pagination, A11y]}
                            slidesPerView={1}
                            spaceBetween={16}
                            navigation
                            pagination={{ clickable: true }}
                            autoHeight   // ajusta a altura do slide conforme a imagem
                            style={{ paddingBottom: 30 }}
                            className="swiperDefault"
                        >
                            {slides.map((s, i) => (
                                <SwiperSlide key={i} className="m-b-45">
                                    <figure className="mb-0">
                                        <article>
                                            <div className="article-inner">
                                                {fit === "cover" ? (
                                                    // MODO COVER (preenche e pode cortar)
                                                    <div
                                                        className="imgcropped position-relative w-100 overflow-hidden rounded"
                                                        style={{ aspectRatio }}
                                                    >
                                                        <Image
                                                            src={s.src}
                                                            alt={s.alt}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, 565px"
                                                            style={{ objectFit: "cover" }}
                                                            priority={i === 0}
                                                        />
                                                    </div>
                                                ) : (
                                                    // MODO CONTAIN (mostra inteiro, sem corte)
                                                    <div className="w-100 d-flex justify-content-center bg-transparent">
                                                        <Image
                                                            src={s.src}
                                                            alt={s.alt}
                                                            width={1600}         // valores grandes para garantir boa resolução
                                                            height={900}         // ajuste conforme seu padrão (16:9 aqui)
                                                            className="img-fluid w-100 h-auto rounded"
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
