// app/components/Confirm.tsx
"use client";
import { FaStoreAlt } from "react-icons/fa";
import {useStore} from "@/app/[number]/hooks/useStore";
import {Pages, Store} from "@/app/services/stores";
import {useCart} from "@/app/[number]/contexts/CartContext";
import {useDeferredValue, useMemo} from "react";
import Link from "next/link";


type ConfirmProps = {
    store: Store
    hasStore?: boolean
}

export default function Confirm({
    store,
    hasStore = false,
                                }: ConfirmProps) {
    const { getPageUrl } = useStore(store)
    const { products } = useCart()
    const deferredProducts = useDeferredValue(products)
    const hasConfirm = useMemo(
        () => Object.values(deferredProducts).length > 0,
        [deferredProducts]
    );

    if (!hasConfirm) {
        return null;
    }

    return (
        <>
            <Block />
            <div
                className="position-fixed bottom-0 start-0 end-0 bg-body border-top"
                style={{ zIndex: 1050 }}
            >
                <div className="container py-3">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-12">
                            <div className="row g-2 align-items-stretch">
                                <div className="col-10">
                                    <Link
                                        href={getPageUrl(Pages.CART)}
                                        className="btn btn-primary btn-lg fw-semibold text-uppercase w-100 h-100"
                                    >
                                        ENVIAR MENSAGEM
                                    </Link>
                                </div>
                                {hasStore && (<div className="col-2">
                                    <Link
                                        href={getPageUrl(Pages.HOME)}
                                        className="btn btn-outline-primary btn-lg w-100 h-100 d-flex align-items-center justify-content-center"
                                        aria-label="Voltar"
                                    >
                                        <FaStoreAlt size={22} />
                                    </Link>
                                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const Block = () => (
    <div className="pb-5 pt-lg-5"></div>
)
