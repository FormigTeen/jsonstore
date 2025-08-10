// app/components/Offers.tsx (ou src/components/Offers.tsx)
"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Product = {
    href: string;
    title: string;
    img: { src: string; alt: string };
    price?: number;              // em centavos ou reais (ver priceInCents)
    priceText?: string;          // caso já venha formatado (ex.: "R$ 2.999,99")
    pricePrefix?: string;        // ex.: "a partir de"
    priceInCents?: boolean;      // se true, `price` está em centavos
    ariaLabel?: string;
};

type OffersProps = {
    products?: Product[];
    className?: string;
};

const defaults: Product[] = [
    {
        href: "https://gramstore.com.br/nbz/exemplo-de-multiplos-produtos-variados",
        title: "Exemplo de Múltiplos Produtos Variados",
        img: { src: "https://gramstore.com.br/storage/175618/gramstore-produto-19.png", alt: "Exemplo de Múltiplos Produtos Variados" },
        priceText: "R$ 2.999,99",
        pricePrefix: "a partir de",
    },
    {
        href: "https://gramstore.com.br/nbz/exemplo-de-produto-com-variacao-de-cores",
        title: "Exemplo de produto com variação de cores",
        img: { src: "https://gramstore.com.br/storage/175615/gramstore-produto-20.png", alt: "Exemplo de produto com variação de cores" },
        priceText: "R$ 2.999,99",
        pricePrefix: "a partir de",
    },
    {
        href: "https://gramstore.com.br/nbz/bolsa-fashion-pink",
        title: "Bolsa Fashion Pink",
        img: { src: "https://gramstore.com.br/storage/7/pagstore-produto-teste-16.jpg", alt: "Bolsa Fashion Pink" },
        priceText: "R$ 3.999,99",
    },
    {
        href: "https://gramstore.com.br/nbz/exemplo-de-look-completo-01",
        title: "Exemplo de Look Completo 01",
        img: { src: "https://gramstore.com.br/storage/8/pagstore-produto-teste-07.jpg", alt: "Exemplo de Look Completo 01" },
        priceText: "R$ 2.999,99",
        pricePrefix: "a partir de",
    },
    {
        href: "https://gramstore.com.br/nbz/exemplo-de-multiplos-produtos-variados",
        title: "Exemplo de Múltiplos Produtos Variados",
        img: { src: "https://gramstore.com.br/storage/175618/gramstore-produto-19.png", alt: "Exemplo de Múltiplos Produtos Variados" },
        priceText: "R$ 2.999,99",
        pricePrefix: "a partir de",
    },
    {
        href: "https://gramstore.com.br/nbz/exemplo-de-produto-com-variacao-de-cores",
        title: "Exemplo de produto com variação de cores",
        img: { src: "https://gramstore.com.br/storage/175615/gramstore-produto-20.png", alt: "Exemplo de produto com variação de cores" },
        priceText: "R$ 2.999,99",
        pricePrefix: "a partir de",
    },
    {
        href: "https://gramstore.com.br/nbz/bolsa-fashion-pink",
        title: "Bolsa Fashion Pink",
        img: { src: "https://gramstore.com.br/storage/7/pagstore-produto-teste-16.jpg", alt: "Bolsa Fashion Pink" },
        priceText: "R$ 3.999,99",
    },
    {
        href: "https://gramstore.com.br/nbz/exemplo-de-look-completo-01",
        title: "Exemplo de Look Completo 01",
        img: { src: "https://gramstore.com.br/storage/8/pagstore-produto-teste-07.jpg", alt: "Exemplo de Look Completo 01" },
        priceText: "R$ 2.999,99",
        pricePrefix: "a partir de",
    },
];

function formatBRL(value: number, inCents?: boolean) {
    const reais = inCents ? value / 100 : value;
    return reais.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Offers({ products = defaults, className = "" }: OffersProps) {
    return (
        <section className={`${className}`}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Swiper
                            modules={[Navigation, Pagination, A11y]}
                            spaceBetween={10}
                            slidesPerView={1.1}
                            navigation
                            pagination={{ clickable: true }}
                            breakpoints={{
                                576: { slidesPerView: 2.1, spaceBetween: 10 },
                                768: { slidesPerView: 3, spaceBetween: 12 },
                                992: { slidesPerView: 4, spaceBetween: 12 },
                            }}
                            style={{ paddingBottom: 24 }}
                        >
                            {products.map((p, i) => (
                                <SwiperSlide key={i} className="mb-5" style={{ width: 310 }}>
                                    <Link href={p.href} aria-label={p.ariaLabel ?? p.title} className="text-decoration-none">
                                        <article>
                                            <div className="article-inner rounded border position-relative overflow-hidden">
                                                {/* elemento que recebe o :before do overlay */}
                                                <span className="overlay3 position-absolute top-0 start-0 w-100 h-100" />

                                                {/* imagem */}
                                                <div className="rounded position-relative w-100" style={{ aspectRatio: "1 / 1" }}>
                                                    <Image
                                                        src={p.img.src}
                                                        alt={p.img.alt}
                                                        fill
                                                        sizes="(max-width: 576px) 90vw, (max-width: 992px) 33vw, 310px"
                                                        style={{ objectFit: "cover" }}
                                                        priority={i < 2}
                                                    />
                                                </div>

                                                {/* info acima do overlay */}
                                                <div className="position-absolute bottom-0 start-0 w-100 px-3 pb-3" style={{ zIndex: 3 }}>
                                                    <h3 className="h6 text-white fw-semibold mb-2 text-truncate">{p.title}</h3>

                                                    {(p.priceText || typeof p.price === "number") && (
                                                        <p className="mb-0 text-white">
                                                            {p.pricePrefix && <small className="text-muted me-1">{p.pricePrefix}</small>}
                                                            {p.priceText ?? formatBRL(p.price as number, p.priceInCents)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}
