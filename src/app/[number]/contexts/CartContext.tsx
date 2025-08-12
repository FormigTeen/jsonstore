'use client'
import React, {useContext} from "react";
import {useImmerAtom} from "jotai-immer";
import {cartByStoreAtom, persistCartAtom, ProductCart} from "@/app/services/cart";
import {useParams} from "next/navigation";
import {getStore} from "@/app/services/stores";
import {Atom} from "jotai/vanilla/atom";

export type Cart = {
    products: Atom<ProductCart[]>
    setItem: (entry: ProductCart) => void
}

export type StoreParams = {
    number: string
}

const CartContext = React.createContext<Cart>({
    products: cartByStoreAtom(getStore("")),
    setItem: () => {},
});

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {


    const { number: id } = useParams<{ number: string }>()

    const store = getStore(id)
    const products = cartByStoreAtom(store)
    const [, setItemOnStorage] = useImmerAtom(
        persistCartAtom
    )

    const setItem = (entry: ProductCart) => {
        setItemOnStorage((prev: ProductCart[]) => {
            const index = prev.findIndex(
                prevItem =>
                prevItem.store.id === entry.store.id
                    && prevItem.product.slug === entry.product.slug
                    && prevItem.item.slug === entry.item.slug
                )
            ;
            if (index !== -1) {
                prev[index].quantity = entry.quantity;
            } else {
                prev.push(entry);
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