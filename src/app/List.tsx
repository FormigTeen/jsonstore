// app/components/List.tsx
"use client";

import { useState, useMemo } from "react";
import Switch from "react-switch";
import { FaCheckCircle, FaShoppingBag } from "react-icons/fa";
import useSound from "use-sound";
import { FaCartPlus} from "react-icons/fa6";
import {Product} from "@/app/services/stores";
import {toString} from "@/app/services/money";
import {useCart} from "@/app/[number]/contexts/CartContext";
import {useAtom} from "jotai/react/useAtom";

type ListProps = {
    product: Product;
    onSelectionChange?: (ids: (string | number)[]) => void;
};

export default function List({
    product,
                                 onSelectionChange,
                             }: ListProps) {
    const items = product.items
    const [selected, setSelected] = useState<Record<string, boolean>>({});
    const [play] = useSound("https://actions.google.com/sounds/v1/buttons/wood_plank_flicks.ogg", { volume: 0.5 });
    const selectedIds = [] as string[];
    const { products } = useCart()

    return (
        <section className="pt-0">
            <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-12">
                            {items.map((it, idx) => {
                                const id = "";
                                return (
                                    <div key={id}>
                                        {idx === 0 && <hr className="m-0 light" />}
                                        <div className="row mx-0 py-2 align-items-center">
                                            <div className="col-9 p-0">
                                                <h3 className="font-15 text-black font-600 trunc-3 mb-1 mt-0">{it.title}</h3>
                                                <p className="font-14 font-400 text-primary mt-0 mb-0 py-0">
                                                    {toString(it.price)}
                                                    {it.listPrice && <span className="font-300 text-muted mx-2 text-riscado">{toString(it.listPrice)}</span>}
                                                </p>
                                            </div>
                                            <div className="col-3 p-0 text-end">
                                                <Switch
                                                    onChange={(checked) => {
                                                        setSelected(prev => ({ ...prev, [id]: checked }));
                                                        onSelectionChange?.(selectedIds);
                                                        play();
                                                    }}
                                                    checked={!!selected[id]}
                                                    width={60}
                                                    height={30}
                                                    handleDiameter={24}
                                                    borderRadius={6}
                                                    offColor="#f0f0f0"
                                                    onColor="#0d6efd"
                                                    uncheckedIcon={
                                                        <div style={{
                                                            width: "100%", height: "100%",
                                                            display: "flex", alignItems: "center", justifyContent: "center"
                                                        }}>
                                                            <FaCartPlus color="#888" size={16} />
                                                        </div>
                                                    }
                                                    checkedIcon={
                                                        <div style={{
                                                            width: "100%", height: "100%",
                                                            display: "flex", alignItems: "center", justifyContent: "center"
                                                        }}>
                                                            <FaCheckCircle color="#fff" size={16} />
                                                        </div>
                                                    }
                                                />
                                                <input type="hidden" name="items_id[]" value={id} />
                                            </div>
                                        </div>
                                        <hr className="m-0 light" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
            </div>
        </section>
    );
}
