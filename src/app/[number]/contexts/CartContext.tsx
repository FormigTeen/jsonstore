'use client'
import React from "react";

export type Cart = {
    products: unknown[]
    count: number
}

export type StoreParams = {
    number: string
}

const CartContext = React.createContext<Cart | undefined>({
    products: [],
    count: 0,
});

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const cartContext = {
        products: [],
        count: 0,
    }


    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
};

