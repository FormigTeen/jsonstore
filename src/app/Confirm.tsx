"use client";
import { FaStoreAlt } from "react-icons/fa";
import { useStore } from "@/app/[number]/hooks/useStore";
import { Pages, Store } from "@/app/services/stores";
import { useCart } from "@/app/[number]/contexts/CartContext";
import { useDeferredValue, useMemo } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type ConfirmProps = {
    store: Store;
    hasStore?: boolean;
};

export default function Confirm({ store, hasStore = false }: ConfirmProps) {
    const { getPageUrl } = useStore(store);
    const { products } = useCart();
    const deferredProducts = useDeferredValue(products);
    const hasConfirm = useMemo(
        () => Object.values(deferredProducts).length > 0,
        [deferredProducts]
    );

    const prefersReducedMotion = useReducedMotion();
    const t = prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" } as const;

    if (!hasConfirm) return null;

    return (
        <>
            <Block />
            <Block />
            <div
                className="position-fixed bottom-0 start-0 end-0 bg-body border-top"
                style={{ zIndex: 1050 }}
            >
                <div className="container py-3">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-12">
                            {/* layout faz o reflow suave quando o botão da direita entra/sai */}
                            <motion.div className="row g-2 align-items-stretch" layout>
                                {/* ESQUERDA — expande quando o da direita some */}
                                <motion.div className="col" layout transition={t}>
                                    <Link
                                        href={getPageUrl(Pages.CART)}
                                        className="btn btn-primary btn-lg fw-semibold text-uppercase w-100 h-100"
                                    >
                                        ENVIAR MENSAGEM
                                    </Link>
                                </motion.div>

                                {/* DIREITA — aparece/desaparece pela direita */}
                                <AnimatePresence mode="popLayout" initial={false}>
                                    {hasStore && (
                                        <motion.div
                                            key="store-btn"
                                            className="col-2"
                                            layout
                                            // se quiser que venha totalmente “de fora”, troque 24 por "100%"
                                            initial={{ opacity: 0, x: "100%" }}
                                            animate={{ opacity: 1, x: 0, transition: t }}
                                            exit={{ opacity: 0, x: "100%", transition: t }}
                                        >
                                            <Link
                                                href={getPageUrl(Pages.HOME)}
                                                className="btn btn-outline-primary btn-lg w-100 h-100 d-flex align-items-center justify-content-center"
                                                aria-label="Voltar"
                                            >
                                                <FaStoreAlt size={22} />
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const Block = () => <div className="pb-5 pb-lg-5"></div>;
