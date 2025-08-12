import {atomFamily, atomWithStorage} from 'jotai/utils'
import { atom } from "jotai";
import {Item, Product, Store} from "@/app/services/stores";
import {withImmer} from "jotai-immer";

export type HasSlug = {
    slug: string
}

export type ProductCart = {
    store: Pick<Store, 'id'>
    product: Product & HasSlug
    item: Item & HasSlug
    quantity: number
}
export const persistCartAtom = atomWithStorage<ProductCart[]>(
    'cart',
    [],
)

export const cartAtom = withImmer(persistCartAtom)


export const cartByStoreAtom = atomFamily(
    (store: Pick<Store, 'id'>) =>
        atom((get) => get(cartAtom).filter((c) => c.store.id === store.id))
)

export const cartByProductAtom = atomFamily(
    (product: HasSlug) =>
        atom((get) => get(cartAtom).filter((c) => c.product.slug === product.slug))
)