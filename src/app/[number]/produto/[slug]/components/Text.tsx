"use client";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import {Product} from "@/app/services/stores";

type TextProps = {
    product: Product;
    className?: string;
};

export default function Text({
                                 product,
                                 className = "",
                             }: TextProps) {

    const styleSquare: React.CSSProperties = {
        width: 36,
        height: 36,
        padding: 0,
    };

    const handleShare = () => {

    }

    const handleMessage = () => {

    }

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
                                    overlay={<Tooltip id="tooltip-share">Compartilhar</Tooltip>}
                                    rootClose
                                >
                                    <Button
                                        variant="outline-primary"
                                        className="rounded-3 p-0 d-inline-flex align-items-center justify-content-center"
                                        style={styleSquare}
                                        onClick={handleShare}
                                    >
                                        <>
                                            <i className="bi bi-share" aria-hidden="true" />
                                            <span className="visually-hidden">Compartilhar</span>
                                        </>
                                    </Button>
                                </OverlayTrigger>
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
                                    >
                                        <>
                                            <i className="bi bi-chat-dots" aria-hidden="true" />
                                            <span className="visually-hidden">Enviar mensagem</span>
                                        </>
                                    </Button>
                                </OverlayTrigger>
                            </div>
                        </div>
                    </div>
                </div>

                {/* linha da descrição */}
                {product.description && (
                    <div className="row mt-2 py-5">
                        <div className="col-md-6 offset-md-3 col-12">
                            <p style={{ whiteSpace: "pre-line" }} className="mb-0">
                                {product.description}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
