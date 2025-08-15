// app/components/Filter.tsx
"use client";
import "./filter.css"
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import {Store} from "@/app/services/stores";
import {useProducts} from "@/app/[number]/hooks/useProducts";
import {FC, useMemo} from "react";
import {getUri} from "@/app/services/string";
import {availableOrderDictionary, useFilter} from "@/app/[number]/contexts/FilterContext";

type Category = {
    slug: string;
    label: string;
}

type FilterProps = {
    store: Store;
    className?: string;
};

export default function Filter({
                                   store,
                                   className = "",
                               }: FilterProps) {

    const { categoryDictionary } = useProducts(store)
    const { categories: selectedCategories, clear, text, setText, order, setOrder } = useFilter()
    const orders = useMemo(
        () => Object.entries(availableOrderDictionary)
            .map(([value, label]) => ({
                value,
                label,
            }))
        , []
    )

    const categories: Array<Category & { isActive: boolean }> = useMemo(
        () => Object.keys(categoryDictionary).sort((a, b) => a.localeCompare(b)).map(
            (cat) => ({
                slug: getUri(cat),
                label: cat,
                isActive: selectedCategories.includes(cat.toLowerCase()),
            })
        ),
        [categoryDictionary, selectedCategories]
    )

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        clear()
    };

    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setText(newText);
    }

    const handleSelectOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        const newOrder = parseInt(e.target.value);
        setOrder(newOrder);
    }

    return (
        <section className={`py-1 mb-4 ${className}`}>
            <div className="container">
                {/* Linha única: busca + ordenação + LIMPAR */}
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-12">
                            <div className="input-group">
                                {/* Busca */}
                                <input
                                    className="form-control form-control-sm"
                                    type="text"
                                    onChange={handleText}
                                    value={text}
                                    placeholder="Busque produtos…"
                                    aria-label="Buscar produtos"
                                />
                                {/* Ordenação */}
                                <select
                                    className="form-select form-select-sm"
                                    value={order}
                                    aria-label="Ordenação"
                                    onChange={handleSelectOrder}
                                    style={{ maxWidth: 200 }}
                                >
                                    {orders.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                {/* LIMPAR (mesmo estilo do PESQUISAR original) */}
                                <button
                                    className="button-load btn btn-outline-primary case-u font-11 font-500"
                                    type="button"
                                    onClick={handleClear}
                                >
                                    LIMPAR
                                </button>
                            </div>
                    </div>
                </div>

                {/* Categorias com Swiper + fades de indicação nas laterais */}
                <div className="row mt-3">
                    <div className="col-md-6 offset-md-3 col-12 position-relative swipe-fade">
                        <Swiper
                            modules={[FreeMode, A11y]}
                            freeMode
                            slidesPerView="auto"
                            spaceBetween={8}
                            aria-label="Categorias"
                        >
                            {categories
                                .map(
                                    (cat) => (
                                        <SwiperSlide key={cat.slug}  style={{ width: "auto" }}>
                                            <CategorySlide category={cat} isActive={cat.isActive} />
                                        </SwiperSlide>
                                    )
                                )
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}

type CategorySlideProps = {
    isActive?: boolean;
    category: Category;
    onClick?: (category: Category) => void;
}
const CategorySlide: FC<CategorySlideProps> = ({
    isActive = false,
                                                   category,
    onClick,
                                               }) => {

    const handleClick = () => onClick && onClick(category);

    return (
            <button
                onClick={handleClick}
                className={`btn btn-sm case-u font-11 font-500 me-1 ${
                    isActive ? "btn-primary text-white" : "btn-outline-primary"
                }`}
                aria-pressed={isActive}
            >
                {category.label}
            </button>
    );
}