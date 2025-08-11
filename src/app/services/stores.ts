import stores from './stores.json';

export type Store = {
    id: string;
    title: string;
    logoUrl: string;
    host: string;
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