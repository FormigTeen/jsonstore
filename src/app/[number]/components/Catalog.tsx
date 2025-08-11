'use client'
import Link from "next/link";
import Image from "next/image";
import {useFilter} from "@/app/[number]/contexts/FilterContext";
import {useDeferredValue, useMemo} from "react";
import {getUri, useProducts} from "@/app/[number]/hooks/useProducts";
import {getUrl, Product, Store} from "@/app/services/stores";
import {toString} from "@/app/services/money";

type OlderProduct = {
    pricePrefix?: string; // ex.: "a partir de"
} & Product;

type CatalogProps = {
    className?: string;
    store: Store;
    aspectRatio?: string; // ex.: "1 / 1" (quadrado), "4 / 5", "3 / 4"...
};

export default function Catalog({
                                    store,
                                    className = "",
                                    aspectRatio = "1 / 1",
                                }: CatalogProps) {

    const { text } = useFilter()
    const { products: otherProducts } = useProducts(store);
    const products: OlderProduct[] = useMemo(() => otherProducts.map(aProduct => ({
        ...aProduct,
        pricePrefix: "",
    })),
        [otherProducts]
    );

    const deferredText = useDeferredValue(text);

    const filteredProducts = products.filter(product => {
        if ( !deferredText || deferredText.trim() === "" ) return true;
        return product.title.toLowerCase().includes(deferredText.toLowerCase());
    });

    return (
        <section className={`py-1 mb-4 ${className}`}>
            <div className="container">
                <div className="row">
                    {filteredProducts.map((p, i) => (
                        <div key={i} className="col-md-3 col-6 mb-3">
                            <Link href={getUrl(store)(getUri(p))} aria-label={p.title} className="text-decoration-none">
                                <article>
                                    <div className="article-inner rounded border">
                                        <div
                                            className="imgcropped rounded position-relative w-100 overflow-hidden"
                                            style={{ aspectRatio }}
                                        >
                                            <Image
                                                src={p.imageUrl}
                                                alt={`Imagem de ${p.title}`}
                                                fill
                                                sizes="(max-width: 576px) 50vw, (max-width: 992px) 25vw, 240px"
                                                style={{ objectFit: "cover" }}
                                                priority={i < 2}
                                            />
                                        </div>
                                    </div>

                                    <h3 className="h6 text-dark fw-semibold my-2 text-truncate">{p.title}</h3>

                                    {p.price && (
                                        <p className="mb-3 text-primary">
                                            {p.pricePrefix && <small className="text-muted me-1">{p.pricePrefix}</small>}
                                            {toString(p.price)}
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
