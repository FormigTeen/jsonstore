import stores from './stores.json';

export type Store = {
    id: string;
    title: string;
    logoUrl: string;
    host: string;
    products: Product[];
}

export type Product = {
    title: string;
    description?: string;
    imagesUrl: string[];
    categories: string[]
    items: Item[]
}

export type Item = {
    title: string;
    price: number;
    listPrice?: number;
}

export enum Pages {
    HOME = '/',
    CART = '/carrinho',
    PRODUCT = '/produto',
}

export const getStore = (id: string) => {
    return (stores as Record<string, Store>)[id]
}

export const getUrl =
    (store: Store) =>
        (uri: Pages | string) => `/${store.id}/${uri}`
