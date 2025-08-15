'use client'
import {useFilter} from "@/app/[number]/contexts/FilterContext";
import {useDeferredValue} from "react";
import { getUri, useProducts} from "@/app/[number]/hooks/useProducts";
import {getUrl, Store} from "@/app/services/stores";
import {Card} from "@/app/[number]/_components/Card";
import { AnimatePresence, motion } from "framer-motion";

type CatalogProps = {
    className?: string;
    store: Store;
    aspectRatio?: string; // ex.: "1 / 1", "4 / 5"...
};

export default function Catalog({ store, className = "" }: CatalogProps) {
    const { applyFilter } = useFilter();
    const { products } = useProducts(store);

    const filteredProducts = applyFilter(products);
    // deixa mais fluido quando o usuário digita rápido no filtro:
    const deferredProducts = useDeferredValue(filteredProducts);

    return (
        <section className={`py-1 mb-4 ${className}`}>
            <div className="container">
                {/* 'layout' aqui anima o rearranjo do grid */}
                <motion.div className="row" layout>
                    <AnimatePresence mode="popLayout" initial={false}>
                        {deferredProducts.map((aProduct) => (
                            <Card
                                key={getUri(aProduct)} // evite usar o índice!
                                product={aProduct}
                                href={getUrl(store)(getUri(aProduct))}
                                // props de animação vão para o motion.div dentro do Card
                                motionProps={{
                                    layout: true,
                                    initial: { opacity: 0, scale: 0.98, y: 8 },
                                    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.20, ease: "easeOut" } },
                                    exit:    { opacity: 0, scale: 0.98, y: 8, transition: { duration: 0.15, ease: "easeIn" } },
                                }}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
