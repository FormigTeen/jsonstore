import {Product, Store} from "@/app/services/stores";
import {useStore} from "@/app/[number]/hooks/useStore";
import memoizeOne from "memoize-one";

export const getUri = (product: Product) =>
    encodeURIComponent(product.title)

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