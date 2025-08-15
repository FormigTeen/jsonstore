import {atomFamily, atomWithStorage} from 'jotai/utils'
import { atom } from "jotai";
import {Item, Product, Store} from "@/app/services/stores";
import {withImmer} from "jotai-immer";

export type HasSlug = {
    slug: string
}

type StoreSlug = string
type ProductSlug = string
type ItemSlug = string
export type Cart = Record<StoreSlug, Record<ProductSlug, Record<ItemSlug, ItemCart>>>

export type ItemCart = {
    store: Pick<Store, 'id'>
    product: Product & HasSlug
    item: Item & HasSlug
    quantity: number
}

export const persistCartAtom = atomWithStorage<Cart>(
    'cart',
    {}
)

export const cartAtom = withImmer(persistCartAtom)

export const storeCartAtom = atomFamily(
    (store: Pick<Store, "id">) => {
        return atom<Record<ProductSlug, Record<ItemSlug, ItemCart>>>((get) => {
            const cart = get(cartAtom);
            return cart[store.id] || {};
        });
    }
);