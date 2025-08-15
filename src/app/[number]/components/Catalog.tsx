'use client'
import {useFilter} from "@/app/[number]/contexts/FilterContext";
import {useDeferredValue} from "react";
import { getUri, useProducts} from "@/app/[number]/hooks/useProducts";
import {getUrl, Store} from "@/app/services/stores";
import {Card} from "@/app/[number]/components/Card";

type CatalogProps = {
    className?: string;
    store: Store;
    aspectRatio?: string; // ex.: "1 / 1" (quadrado), "4 / 5", "3 / 4"...
};

export default function Catalog({
                                    store,
                                    className = "",
                                }: CatalogProps) {

    const { text } = useFilter()
    const { products } = useProducts(store);

    const deferredText = useDeferredValue(text);

    const filteredProducts = products.filter(product => {
        if ( !deferredText || deferredText.trim() === "" ) return true;
        return product.title.toLowerCase().includes(deferredText.toLowerCase());
    });

    return (
        <section className={`py-1 mb-4 ${className}`}>
            <div className="container">
                <div className="row">
                    {
                        filteredProducts.map(
                            (aProduct, key) => (
                                <Card
                                    key={key}
                                    product={aProduct}
                                    href={getUrl(store)(getUri(aProduct))}
                                />
                            )
                        )
                    }
                </div>
            </div>
        </section>
    );
}
