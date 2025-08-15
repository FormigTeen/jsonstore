"use client";
import {FC, useMemo, useState} from "react";
import { useRouter } from "next/navigation";
import {FaArrowLeftLong} from "react-icons/fa6";
import {useCart} from "@/app/[number]/contexts/CartContext";
import {toString} from "@/app/services/money";
import {ItemCart} from "@/app/stores/cart";
import {useAtom} from "jotai";
import {nameAtom, zipAtom} from "@/app/stores/user";
import {useZip} from "@/app/_hooks/useZip";
import {useAddress} from "@/app/_hooks/useAddress";

type CartItem = {
    id: number | string;
    title: string;
    price: number; // em centavos? aqui está em reais (número) para simplificar
    quantity?: number;
};

type CartProps = {
    items: CartItem[];
};

type Step = 0 | 1 | 2 | 3 | 4; // 0 Itens, 1 Nome, 2 CEP, 3 Endereço, 4 Pagamento


export default function Cart({
                             }: CartProps) {

    const router = useRouter();

    const [step, setStep] = useState<Step>(0);
    const { products } = useCart()
    const [name] = useAtom(nameAtom);
    const [zip] = useAtom(zipAtom);
    const {data: address} = useZip(zip)
    const { number } = useAddress(zip)
    const [payment, setPayment] = useState<"credito" | "debito" | null>(null);

    const items = useMemo(() => {
        return Object.values(products)
            .flatMap(prod => Object.values(prod))
            .filter(item => item.quantity > 0);
    }, [products]);

    const total = useMemo(
        () => items
            .reduce((acc, item) => acc + (item.item.price * item.quantity), 0),
        [items]
    );

    const canContinue =
        step === 0
            ? items.length > 0
            : step === 1
                ? name.trim().length > 2
                : step === 2
                    ? zip.trim().length == 8 && !!address && !("erro" in address)
                    : step === 3
                        ? number.trim().length > 0
                        : step === 4
                            ? !!payment
                            : false;

    const isLastStep = step === 4;

    const handleBack = () => {
        if (step === 0) {
            router.back();
        } else {
            setStep(((s: Step) => (s - 1) as Step));
        }
    };

    const handleContinue = () => {
        if (!canContinue) return;
        setStep(((s: Step) => (s + 1) as Step));
    };


    return (
        <section className="pt-0" style={{ paddingBottom: 128 }}>
            <div className="container">
                    <div className="row min-vh-70 align-items-center">
                        <div className="col-md-6 offset-md-3 col-12">
                            {step === 0 && (<SummaryStep />)}

                            {step === 1 && (<NameStep />)}

                            {step === 2 && (<ZipStep />)}

                            {step === 3 && (<AddressStep />)}

                            {step === 4 && (<PaymentStep
                                payment={payment}
                                setPayment={setPayment}
                            />)}

                        </div>
                    </div>
            </div>

            {/* ESPAÇADOR para conteúdo não ficar sob a barra fixa */}
            <div aria-hidden="true" style={{ height: 0 }} />


            {/* BARRA FIXA INFERIOR */}
            <div className="position-fixed bottom-0 start-0 end-0 bg-body border-top" style={{ zIndex: 1050 }}>
                <div className="container py-3">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-12">
                            {/* total acima dos botões, alinhado à esquerda */}
                            <div className="text-uppercase small text-muted">Total a pagar</div>
                            <div className="h4 text-primary mb-2">{toString(total)}</div>

                            {/* linha dos botões: 25% voltar / 75% continuar */}
                            <div className="row g-2 align-items-stretch">
                                <div className="col-3">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-lg w-100 h-100 d-flex align-items-center justify-content-center"
                                        onClick={handleBack}
                                        aria-label="Voltar"
                                        title="Voltar"
                                    >
                                        <FaArrowLeftLong size={22} />
                                    </button>
                                </div>

                                <div className="col-9">
                                    <button
                                        type={isLastStep ? "submit" : "button"}
                                        form={isLastStep ? "cart-form" : undefined}
                                        className="btn btn-success btn-lg w-100 text-uppercase fw-semibold"
                                        onClick={!isLastStep ? handleContinue : undefined}
                                        disabled={!canContinue}
                                    >
                                        {isLastStep ? "ENVIAR PEDIDO PARA WHATSAPP" : "CONTINUAR"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}


const SummaryStep = () => {
    const { products, setItem } = useCart()
    const items = Object.values(products).flatMap(prod => Object.values(prod));
    console.log({
        items
    })

    const updateItem = (item: ItemCart) => (quantity: number) => setItem({
        product: item.product,
        item: item.item,
        quantity: quantity > 0 ? quantity : 0,
    });

    const updateQuantity = (item: ItemCart) => (event: React.ChangeEvent<HTMLSelectElement>) => {
        const quantity = Number(event.target.value);
        updateItem(item)(quantity);
    }

    const removeItem = (item: ItemCart) => () => updateItem(item)(0)

    return (
        <div aria-labelledby="step-itens">
            <h2 id="step-itens" className="h5 mb-3">Seus itens</h2>
            <hr className="m-0 light" />
            {items.map((it) => (
                <div key={it.product.slug.concat('|').concat(it.item.slug)}>
                    <div className="row mx-0 py-2 cart-item">
                        <div className="col-8 col-md-9 py-0">
                            <h3 className="font-14 text-black fw-semibold mb-1 mt-0">
                                {it.item.title}
                            </h3>
                            <p className="font-14 fw-semibold text-primary mb-0">
                                {toString(it.item.price)}
                            </p>
                        </div>
                        <div className="col-4 col-md-3 py-0 text-end">
                            <div className="input-group">
                                <select
                                    className="form-select form-select-sm fw-semibold"
                                    value={it.quantity}
                                    onChange={updateQuantity(it)}
                                    aria-label={`Quantidade do item ${it.item.title}`}
                                >
                                    {Array.from({ length: 20 }, (_, n) => n + 1).map((n) => (
                                        <option key={n} value={n}>
                                            {n}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm fw-semibold"
                                    onClick={removeItem(it)}
                                    aria-label={`Remover ${it.item.title}`}
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr className="m-0 light" />
                </div>
            ))}
            {items.length === 0 && (
                <p className="text-muted mb-0">Seu carrinho está vazio.</p>
            )}
        </div>
    )
}

const NameStep = () => {
    const [name, setName] = useAtom(nameAtom);

    return (
        <div aria-labelledby="step-nome">
            <h2 id="step-nome" className="h5 mb-3">Seu nome</h2>
            <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Digite seu Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
            />
            <div className="form-text">Usaremos para o pedido e contato.</div>
        </div>
    )
}

export const ZipStep = () => {
    const [zip, setZip] = useAtom(zipAtom);

    return (
        <div aria-labelledby="step-cep">
            <h2 id="step-cep" className="h5 mb-3">CEP para entrega</h2>
            <input
                type="text"
                className="form-control form-control-lg"
                placeholder="00000-000"
                maxLength={9}
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                autoFocus
            />
        </div>
    )
}

export const AddressStep = () => {
    const [zip] = useAtom(zipAtom);
    const {
        number, setNumber,
        complement, setComplement
    } = useAddress(zip)
    const {data: address} = useZip(zip)
    if ( !address || "erro" in address) {
        return null;
    }

    return (
        <div aria-labelledby="step-endereco">
            <h2 id="step-endereco" className="h5 mb-3">Endereço</h2>
            <div className="card p-3 mb-3">
                <p className="mb-0">
                    <b className="text-primary">Seu endereço:</b><br />
                    {address.logradouro}, {address.bairro}, {address.localidade} / {address.uf}
                </p>
            </div>
            <div className="row g-3">
                <div className="col-4">
                    <label className="fw-medium small">Número*</label>
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        autoFocus
                    />
                </div>
                <div className="col-8">
                    <label className="fw-medium small">Complemento</label>
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

type PaymentStepProps = {
    payment: "credito" | "debito" | null;
    setPayment: (payment: "credito" | "debito") => void;
}

const PaymentStep: FC<PaymentStepProps> = ({
    payment,
    setPayment,
                                           }) => {
    return (
        <div aria-labelledby="step-pagamento">
            <h2 id="step-pagamento" className="h5 mb-3">Como prefere pagar?</h2>

            <div className="list-group">
                {[
                    { key: "credito" as const, label: "Cartão de Crédito" },
                    { key: "debito" as const, label: "Cartão de Débito" },
                ].map((opt) => {
                    const active = payment === (opt.key);
                    return (
                        <button
                            key={opt.key}
                            type="button"
                            onClick={() => setPayment(opt.key)}
                            className={[
                                "list-group-item list-group-item-action py-3",
                                "border border-2",
                                active ? "border-primary text-primary" : "border-light",
                            ].join(" ")}
                            aria-pressed={active}
                        >
                            <div className="fw-semibold">{opt.label}</div>
                            <div className="small text-muted">
                                Toque para {active ? "selecionado" : "selecionar"}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    )
}