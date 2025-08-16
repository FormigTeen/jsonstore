"use client";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import {Product, Store} from "@/app/services/stores";

type TextProps = {
    product: Product;
    className?: string;
    store: Store;
};

export default function Title({ product, className = "", store }: TextProps) {
    const styleSquare: React.CSSProperties = {
        width: 36,
        height: 36,
        padding: 0,
    };

    const handleMessage = () => {
        const phone = "55".concat(store.id);
        const title = (product?.title || "produto").trim();
        const pageUrl = typeof window !== "undefined" ? window.location.href : "";
        const text = `Olá! Tenho interesse no produto "${title}". Poderia me ajudar?\n${pageUrl}`;

        // URL universal (abre WhatsApp Web no desktop e tenta app no mobile)
        const waWebUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

        // Deep link direto pro app (melhor para iOS/Android)
        const waAppUrl = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(text)}`;

        try {
            const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
            if (isMobile) {
                // tenta abrir o app primeiro
                window.location.href = waAppUrl;
                // fallback para o universal (caso o app não esteja instalado)
                setTimeout(() => {
                    window.open(waWebUrl, "_blank", "noopener,noreferrer");
                }, 300);
            } else {
                window.open(waWebUrl, "_blank", "noopener,noreferrer");
            }
        } catch {
            // fallback final
            window.open(waWebUrl, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <section className={`py-0 ${className}`}>
            <div className="container">
                {/* linha do título + botões */}
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-12">
                        <div className="d-flex align-items-center justify-content-between gap-2">
                            <h1 className="h3 fw-semibold my-0">{product.title}</h1>

                            <div className="d-flex align-items-center gap-2">
                                <OverlayTrigger
                                    placement="top"
                                    trigger="click"
                                    overlay={<Tooltip id="tooltip-chat">Enviar mensagem</Tooltip>}
                                    rootClose
                                >
                                    <Button
                                        variant="outline-primary"
                                        className="rounded-3 p-0 d-inline-flex align-items-center justify-content-center"
                                        style={styleSquare}
                                        onClick={handleMessage}
                                        aria-label="Enviar mensagem no WhatsApp"
                                        title="Enviar mensagem no WhatsApp"
                                    >
                                        <>
                                            {/* se preferir, troque para 'bi bi-whatsapp' */}
                                            <i className="bi bi-chat-dots" aria-hidden="true" />
                                            <span className="visually-hidden">Enviar mensagem</span>
                                        </>
                                    </Button>
                                </OverlayTrigger>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
