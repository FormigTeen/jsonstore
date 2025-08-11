import {Pages, Product, Store} from "@/app/services/stores";
import {useStore} from "@/app/[number]/hooks/useStore";
import memoizeOne from "memoize-one";
import { getUri as getStringUri } from "@/app/services/string";

export const getUri = (product: Product) =>
    [Pages.PRODUCT, getStringUri(product.title)].join("/")

export const getProducts = (store: Store) => store.products;

export const findProduct = memoizeOne(
    (store: Store, slug: string) =>
        getProducts(store).find(product => getStringUri(product.title) === slug)
)

export const getPrice = memoizeOne(
    (product: Product) =>
        product.items.map(item => item.price)
            .sort((a, b) => a - b)
            .find(Boolean) ?? 0
)


export const getCategoryDictionary = memoizeOne(
    (products: Product[]) =>
        products.flatMap(
            (product) => product.categories.map(category => ({
                category,
                ...product
            }))
        ).reduce(
            (acc, { category, ...product }) => ({
                ...acc,
                [category]: [
                    ...(acc[category] || []),
                    { ...product, uri: getUri(product) }
                ]
            }), {} as Record<string, Product[]>
        )
);

export const useProducts = (store: Store) => {
    const { products } = useStore(store);

    const categoryDictionary = getCategoryDictionary(products);

    return {
        products,
        categoryDictionary,
    }

}