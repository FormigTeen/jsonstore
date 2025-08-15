'use client'
import {createContext, FC, useContext, useState} from "react";
import {useSearchParams} from "next/navigation";
import {toStringArray} from "@/app/services/string";
import {useImmer} from "use-immer";
import {Product} from "@/app/services/stores";
import memoizeOne from "memoize-one";

export type FilterProps = {
    categories: Record<string, unknown>,
    text: string,
    toggleCategory: (category: string) => void,
    setText: (text: string) => void,
    clear: () => void,
    order: number,
    setOrder: (order: number) => void,
    applyFilter: (products: Product[]) => Product[],
}

export const FilterContext = createContext<FilterProps>({
    categories: {},
    text: "",
    toggleCategory: () => {},
    setText: () => {},
    clear: () => {},
    order: 1,
    setOrder: () => {},
    applyFilter: (products: Product[]) => products,
})

export const availableOrderDictionary: Record<number, string> = {
    1: "Título [A-Z]",
    2: "Título [Z-A]",
    3: "Maior Preço",
    4: "Menor Preço"
}

const getMinPrice = memoizeOne((product: Product) => {
    return Math.min(
        ...(product.items.map(item => item.price ?? 0))
    )
})

const getMaxPrice = memoizeOne((product: Product) => {
    return Math.max(
        ...(product.items.map(item => item.price ?? 0))
    )
})

export const orderFunctionDictionary: Record<number, (a: Product, b: Product) => number> = {
    1: (a, b) => a.title.localeCompare(b.title),
    2: (a, b) => b.title.localeCompare(a.title),
    3: (a, b) => getMinPrice(b) - getMinPrice(a),
    4: (a, b) => getMinPrice(a) - getMinPrice(b),
}

export const FilterProvider: FC<
    { children: React.ReactNode }
> = ({ children }) => {
    const searchParams = useSearchParams()
    const categoria = searchParams.get("categoria") ?? "";
    const q = searchParams.get("q") ?? "";
    const ordem = searchParams.get("ordem") ?? "1";

    const [categories, setCategories] = useImmer<Record<string, unknown>>(
        Object.fromEntries(toStringArray(categoria)
            .map(value => [value.toLowerCase(), true])
        )
    );

    const [text , setText] = useState(q);

    const [order, setOrder] = useState<number>(parseInt(ordem));

    const toggleCategory = (category: string) => {
        setCategories(prev => {
            if (category in prev) {
                delete prev[category];
            } else {
                prev[category] = true;
            }
            return prev;
        });
    }

    const clear = () => {
        setCategories({});
        setText("");
    }

    const sanitizedOrder = order in availableOrderDictionary ? order : 1;

    const handleOrder = (newOrder: number) => {
        if (newOrder in availableOrderDictionary) {
            setOrder(newOrder);
        }
    }

    const applyFilter = (products: Product[]) => {
        return products.filter(product => {
            if (text && !product.title.toLowerCase().includes(text.toLowerCase())) {
                return false;
            }
            if (Object.keys(categories).length > 0) {
                const productCategories = product.categories.map(cat => cat.toLowerCase());
                return Object.keys(categories).some(cat => productCategories.includes(cat));
            }
            return true;
        }).sort(orderFunctionDictionary[sanitizedOrder]);
    }

    const contextValue: FilterProps = {
        categories,
        text,
        toggleCategory,
        setText: (text: string) => setText(text),
        clear,
        order: sanitizedOrder,
        setOrder: handleOrder,
        applyFilter,
    }



    return <FilterContext.Provider value={contextValue}>
        {children}
    </FilterContext.Provider>;
}

export const useFilter = () => useContext(FilterContext);