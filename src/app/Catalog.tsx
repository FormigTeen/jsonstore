// app/components/Catalog.tsx (ou src/components/Catalog.tsx)
import Link from "next/link";
import Image from "next/image";

type Product = {
    href: string;
    title: string;
    img: { src: string; alt: string };
    priceText?: string;
    pricePrefix?: string; // ex.: "a partir de"
};

type CatalogProps = {
    products?: Product[];
    className?: string;
    aspectRatio?: string; // ex.: "1 / 1" (quadrado), "4 / 5", "3 / 4"...
};

const defaults: Product[] = [
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
        href: "https://gramstore.com.br/nbz/tenis-azul-de-corrida-sport-nylon-unissex",
        title: "Exemplo de produto com variação de tamanho",
        img: { src: "https://gramstore.com.br/storage/175610/gramstore-produto-16.png", alt: "Exemplo de produto com variação de tamanho" },
        priceText: "R$ 2.999,99",
        pricePrefix: "a partir de",
    },
    {
        href: "https://gramstore.com.br/nbz/exemplo-de-produto-com-variacao-de-tamanho-02",
        title: "Exemplo de produto com variação de tamanho 02",
        img: { src: "https://gramstore.com.br/storage/175614/gramstore-produto-18.png", alt: "Exemplo de produto com variação de tamanho 02" },
        priceText: "R$ 2.999,99",
        pricePrefix: "a partir de",
    },
    {
        href: "https://gramstore.com.br/nbz/exemplo-de-snickers-fashion-colored",
        title: "Exemplo de produto com variação de tamanho e cor",
        img: { src: "https://gramstore.com.br/storage/12/mobbistore-produto-03.jpg", alt: "Exemplo de produto com variação de tamanho e cor" },
        priceText: "R$ 2.999,99",
        pricePrefix: "a partir de",
    },
    {
        href: "https://gramstore.com.br/nbz/look-completo",
        title: "Look Completo",
        img: { src: "https://gramstore.com.br/storage/175613/gramstore-produto-17.png", alt: "Look Completo" },
        priceText: "R$ 99,00",
        pricePrefix: "a partir de",
    },
];

export default function Catalog({
                                    products = defaults,
                                    className = "",
                                    aspectRatio = "1 / 1",
                                }: CatalogProps) {
    return (
        <section className={`py-1 mb-4 ${className}`}>
            <div className="container">
                <div className="row">
                    {products.map((p, i) => (
                        <div key={i} className="col-md-3 col-6 mb-3">
                            <Link href={p.href} aria-label={p.title} className="text-decoration-none">
                                <article>
                                    <div className="article-inner rounded border">
                                        <div
                                            className="imgcropped rounded position-relative w-100 overflow-hidden"
                                            style={{ aspectRatio }}
                                        >
                                            <Image
                                                src={p.img.src}
                                                alt={p.img.alt}
                                                fill
                                                sizes="(max-width: 576px) 50vw, (max-width: 992px) 25vw, 240px"
                                                style={{ objectFit: "cover" }}
                                                priority={i < 2}
                                            />
                                        </div>
                                    </div>

                                    <h3 className="h6 text-dark fw-semibold my-2 text-truncate">{p.title}</h3>

                                    {p.priceText && (
                                        <p className="mb-3 text-primary">
                                            {p.pricePrefix && <small className="text-muted me-1">{p.pricePrefix}</small>}
                                            {p.priceText}
                                        </p>
                                    )}
                                </article>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
