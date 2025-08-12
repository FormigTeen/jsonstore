'use client'
import {createContext, FC, useContext, useState} from "react";
import {useSearchParams} from "next/navigation";
import {toStringArray} from "@/app/services/string";

export type FilterProps = {
    categories: string[],
    text: string,
    addCategory: (category: string) => void,
    setText: (text: string) => void,
    clear: () => void,
    order: number,
    setOrder: (order: number) => void,
}

export const FilterContext = createContext<FilterProps>({
    categories: [],
    text: "",
    addCategory: () => {},
    setText: () => {},
    clear: () => {},
    order: 1,
    setOrder: () => {},
})

export const availableOrderDictionary: Record<number, string> = {
    1: "Título [A-Z]",
    2: "Título [Z-A]",
    3: "Maior Preço",
    4: "Menor Preço",
    5: "Mais Acessados",
    6: "Mais Vendidos",
    7: "Mais Antigos",
    8: "Mais Recentes",
}

export const FilterProvider: FC<
    { children: React.ReactNode }
> = ({ children }) => {
    const searchParams = useSearchParams()
    const categoria = searchParams.get("categoria") ?? "";
    const q = searchParams.get("q") ?? "";
    const ordem = searchParams.get("ordem") ?? "1";

    const [categories, setCategories] = useState<string[]>(
        toStringArray(categoria).map(value => value.toLowerCase())
    );

    const [text , setText] = useState(q);

    const [order, setOrder] = useState<number>(parseInt(ordem));

    const addCategory = (category: string) => {
        setCategories(prev => [...prev, category.toLowerCase()]);
    }

    const clear = () => {
        setCategories([]);
        setText("");
    }

    const sanitizedOrder = order in availableOrderDictionary ? order : 1;

    const handleOrder = (newOrder: number) => {
        if (newOrder in availableOrderDictionary) {
            setOrder(newOrder);
        }
    }

    const contextValue: FilterProps = {
        categories,
        text,
        addCategory,
        setText: (text: string) => setText(text),
        clear,
        order: sanitizedOrder,
        setOrder: handleOrder,
    }


    return <FilterContext.Provider value={contextValue}>
        {children}
    </FilterContext.Provider>;
}

export const useFilter = () => useContext(FilterContext);