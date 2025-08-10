// app/components/List.tsx
"use client";

import { useState, useMemo } from "react";
import Switch from "react-switch";
import { FaCheckCircle, FaShoppingBag } from "react-icons/fa";
import useSound from "use-sound";
import {FaBagShopping, FaCartPlus} from "react-icons/fa6";

type Item = { id: number | string; title: string; priceText: string; compareAtText?: string };

type ListProps = {
    items: Item[];
    action?: string;
    csrfToken?: string;
    onSelectionChange?: (ids: (string | number)[]) => void;
    alertIfEmpty?: string;
};

export default function List({
                                 items,
                                 action = "https://gramstore.com.br/nbz/carrinho",
                                 csrfToken,
                                 onSelectionChange,
                                 alertIfEmpty = "Você precisa selecionar um produto",
                             }: ListProps) {
    const [selected, setSelected] = useState<Record<string, boolean>>({});
    const [play] = useSound("https://actions.google.com/sounds/v1/buttons/wood_plank_flicks.ogg", { volume: 0.5 });

    const selectedIds = useMemo(
        () => items.map(i => String(i.id)).filter(id => selected[id]),
        [items, selected]
    );

    return (
        <section className="pt-0">
            <div className="container">
                <form
                    id="list-form"
                    method="POST"
                    action={action}
                    onSubmit={e => {
                        if (selectedIds.length === 0) {
                            e.preventDefault();
                            alert(alertIfEmpty);
                        }
                    }}
                >
                    {csrfToken && <input type="hidden" name="_token" value={csrfToken} />}
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-12">
                            {items.map((it, idx) => {
                                const id = String(it.id);
                                return (
                                    <div key={id}>
                                        {idx === 0 && <hr className="m-0 light" />}
                                        <div className="row mx-0 py-2 align-items-center">
                                            <div className="col-9 p-0">
                                                <h3 className="font-15 text-black font-600 trunc-3 mb-1 mt-0">{it.title}</h3>
                                                <p className="font-14 font-400 text-primary mt-0 mb-0 py-0">
                                                    {it.priceText}
                                                    {it.compareAtText && <span className="font-300 text-muted mx-2 text-riscado">{it.compareAtText}</span>}
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
                </form>
            </div>
        </section>
    );
}
