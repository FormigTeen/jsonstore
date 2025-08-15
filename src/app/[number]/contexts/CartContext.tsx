'use client'
import React, {useContext, useMemo} from "react";
import {useImmerAtom} from "jotai-immer";
import { persistCartAtom, Cart as CartStorage, ItemCart, storeCartAtom} from "@/app/stores/cart";
import {notFound, useParams} from "next/navigation";
import {getStore} from "@/app/services/stores";
import {useAtom} from "jotai";

export type Cart = {
    products: Record<string, Record<string, ItemCart>>
    setItem: (entry: Omit<ItemCart, 'store'>) => void
}

export type StoreParams = {
    number: string
}

const CartContext = React.createContext<Cart>({
    products: {} as const,
    setItem: () => {},
});

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {


    const params = useParams() as StoreParams | null;


    const id = useMemo<string>(() => {
        const raw = params?.['number']
        return Array.isArray(raw) ? raw[0] : raw || ''
    }, [params])


    const store = useMemo(() => {
        if (!id) return null
        try {
            const s = getStore(id)
            return s ?? null
        } catch {
            return null
        }
    }, [id])

    if (!store) {
        notFound();
    }


    const [products] = useAtom(storeCartAtom(store ?? { id: '' }))
    const [, setItemOnStorage] = useImmerAtom(
        persistCartAtom
    )

    if (!store) {
        // enquanto não temos store (ou id inválido), exponha um contexto “inócuo”
        const empty: Cart = { products: {}, setItem: () => {} }
        return <CartContext.Provider value={empty}>{children}</CartContext.Provider>
    }

    const setItem = (entry: Omit<ItemCart, 'store'>) => {
        setItemOnStorage((prev: CartStorage) => {
            const storeId = store.id;
            const productSlug = entry.product.slug;
            const itemSlug = entry.item.slug;

            if (!prev[storeId]) {
                prev[storeId] = {};
            }

            if (!prev[storeId][productSlug]) {
                prev[storeId][productSlug] = {};
            }

            if (entry.quantity > 0) {
                prev[storeId][productSlug][itemSlug] = {
                    ...entry,
                    store: { id: store.id },
                };
            } else {
                if (prev[storeId][productSlug][itemSlug]) {
                    delete prev[storeId][productSlug][itemSlug];
                }

                if (Object.keys(prev[storeId][productSlug]).length === 0) {
                    delete prev[storeId][productSlug];
                }

                if (Object.keys(prev[storeId]).length === 0) {
                    delete prev[storeId];
                }
            }

        });
    }

    const cartContext = {
        products: products,
        setItem: setItem,
    }




    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);