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
    imageUrl: string;
    price: number;
    categories: string[]
}

export enum Pages {
    HOME = '/',
    CART = '/carrinho',
}

export const getStore = (id: string) => {
    return (stores as Record<string, Store>)[id]
}

export const getUrl =
    (store: Store) =>
        (uri: Pages | string) => `${store.host}/${store.id}/${uri}`