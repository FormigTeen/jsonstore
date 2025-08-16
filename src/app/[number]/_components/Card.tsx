'use client'
import { Product } from "@/app/services/stores";
import { getPrice } from "@/app/[number]/hooks/useProducts";
import Image from "next/image";
import { toString } from "@/app/services/money";
import { FC, ComponentProps } from "react";
import { motion } from "framer-motion";
import TransitionLink from "@/app/components/transition-link";

type CardProps = {
    product: Product;
    href: string;
    aspectRatio?: string; // 2:1 por padrão
    motionProps?: ComponentProps<typeof motion.div>;
};

export const Card: FC<CardProps> = ({
                                        product,
                                        href,
                                        aspectRatio = "2 / 1",
                                        motionProps
                                    }) => {
    const imgSrc = product.imagesUrl?.find(Boolean);
    const hasImage = Boolean(imgSrc);

    return (
        // 1 coluna até lg (tablet incluso), 2 colunas do lg pra cima
        <motion.div className="col-12 col-lg-6 mb-4" {...motionProps}>
            <TransitionLink href={href} aria-label={product.title} className="text-decoration-none">
                <motion.article
                    className="card-horizontal d-flex rounded-4 h-100 bg-white border-0 overflow-hidden p-0"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.995 }}
                    transition={{ type: "spring", stiffness: 300, damping: 26, mass: 0.6 }}
                >
                    {hasImage && (
                        <div
                            className="position-relative overflow-hidden flex-shrink-0"
                            style={{
                                // SEM padding/margem — encosta na borda esquerda do card
                                width: "clamp(200px, 50vw, 280px)",
                                aspectRatio
                            }}
                        >
                            <Image
                                src={imgSrc!}
                                alt={`Imagem de ${product.title}`}
                                fill
                                sizes="(max-width: 992px) 200px, 280px"
                                style={{ objectFit: "cover" }}
                            />
                            {/* <div className="overlay3" /> */}
                        </div>
                    )}

                    <div className="flex-grow-1 min-w-0 d-flex flex-column justify-content-center p-3">
                        <h3 className="h6 text-dark fw-semibold mb-1 line-clamp-2 text-break">
                            {product.title}
                        </h3>

                        {getPrice(product) > 0 && (
                            <p className="mb-0 text-primary">
                                {product.items && product.items.length > 1 && (
                                    <small className="text-muted me-1">A partir de</small>
                                )}
                                {toString(getPrice(product))}
                            </p>
                        )}
                    </div>
                </motion.article>
            </TransitionLink>
        </motion.div>
    );
};
