// app/components/Filter.tsx
"use client";

import "./filter.css"
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import {Store} from "@/app/services/stores";
import {useProducts} from "@/app/[number]/hooks/useProducts";
import {useMemo} from "react";

type OrderOption = { value: string; label: string };
type Category = { slug: string; label: string; active?: boolean };

type FilterProps = {
    store: Store;
    action?: string;
    orders?: OrderOption[];
    categories?: Category[];
    className?: string;
};

const defaultOrders: OrderOption[] = [
    { value: "1", label: "Título [A-Z]" },
    { value: "2", label: "Título [Z-A]" },
    { value: "3", label: "Maior Preço" },
    { value: "4", label: "Menor Preço" },
    { value: "5", label: "Mais Acessados" },
    { value: "6", label: "Mais Vendidos" },
    { value: "7", label: "Mais Antigos" },
    { value: "8", label: "Mais Recentes" },
];

const defaultCategories: Category[] = [
    { slug: "todos", label: "Todas" },
    { slug: "novidades", label: "Novidades", active: true },
    { slug: "calcados", label: "Calçados" },
    { slug: "bolsas", label: "Bolsas", active: true },
    { slug: "acessorios", label: "Acessórios" },
    { slug: "promo", label: "Promoções" },
    { slug: "infantil", label: "Infantil" },
    { slug: "esporte", label: "Esporte" },
    { slug: "casual", label: "Casual" },
    { slug: "social", label: "Social" },
];

export default function Filter({
    store,
                                   action = "https://gramstore.com.br/nbz",
                                   orders = defaultOrders,
                                   categories = defaultCategories,
                                   className = "",
                               }: FilterProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const q = searchParams.get("q") ?? "";
    const ordem = searchParams.get("ordem") ?? orders[0]?.value ?? "1";
    const categoria = searchParams.get("categoria") ?? "todos";

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push(action);
    };

    return (
        <section className={`py-1 mb-4 ${className}`}>
            <div className="container">
                {/* Linha única: busca + ordenação + LIMPAR */}
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-12">
                        <form method="GET" action={action}>
                            {/* preserva a categoria selecionada ao buscar/ordenar */}
                            <input name="categoria" type="hidden" defaultValue={categoria} />
                            <div className="input-group">
                                {/* Busca */}
                                <input
                                    className="form-control form-control-sm"
                                    name="q"
                                    type="text"
                                    defaultValue={q}
                                    placeholder="Busque produtos…"
                                    aria-label="Buscar produtos"
                                />
                                {/* Ordenação */}
                                <select
                                    className="form-select form-select-sm"
                                    name="ordem"
                                    defaultValue={ordem}
                                    aria-label="Ordenação"
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
                        </form>
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
                            {categories.map((cat) => {
                                const isActive =
                                    cat.active || cat.slug === categoria || (!categoria && cat.slug === "todos");

                                const params = new URLSearchParams();
                                if (q) params.set("q", q);
                                if (ordem) params.set("ordem", ordem);
                                params.set("categoria", cat.slug);

                                return (
                                    <SwiperSlide key={cat.slug} style={{ width: "auto" }}>
                                        <Link
                                            href={`${action}?${params.toString()}`}
                                            className={`btn btn-sm case-u font-11 font-500 me-1 ${
                                                isActive ? "btn-primary text-white" : "btn-outline-primary"
                                            }`}
                                            aria-pressed={isActive}
                                        >
                                            {cat.label}
                                        </Link>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}
