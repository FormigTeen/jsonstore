'use client'
import Link from "next/link";
import { Product } from "@/app/services/stores";
import { getPrice } from "@/app/[number]/hooks/useProducts";
import Image from "next/image";
import { toString } from "@/app/services/money";
import { FC, ComponentProps } from "react";
import { motion } from "framer-motion";

type CardProps = {
    product: Product;
    href: string;
    aspectRatio?: string;
    // permite passar initial/animate/exit/layout do Catalog
    motionProps?: ComponentProps<typeof motion.div>;
};

export const Card: FC<CardProps> = ({ product, href, aspectRatio = "1 / 1", motionProps }) => (
    <motion.div className="col-md-3 col-6 mb-3" {...motionProps}>
        <Link href={href} aria-label={product.title} className="text-decoration-none">
            <article>
                <div className="article-inner rounded border">
                    <div
                        className="imgcropped rounded position-relative w-100 overflow-hidden"
                        style={{ aspectRatio }}
                    >
                        <Image
                            src={product.imagesUrl.find(Boolean)!}
                            alt={`Imagem de ${product.title}`}
                            fill
                            sizes="(max-width: 576px) 50vw, (max-width: 992px) 25vw, 240px"
                            style={{ objectFit: "cover" }}
                        />
                        {/* se você usa .overlay3, mantenha aqui dentro */}
                        {/* <div className="overlay3" /> */}
                    </div>
                </div>

                <h3 className="h6 text-dark fw-semibold my-2 text-truncate">{product.title}</h3>

                {getPrice(product) > 0 && (
                    <p className="mb-3 text-primary">
                        {product.items && product.items.length > 1 && (
                            <small className="text-muted me-1">A partir de</small>
                        )}
                        {toString(getPrice(product))}
                    </p>
                )}
            </article>
        </Link>
    </motion.div>
);
