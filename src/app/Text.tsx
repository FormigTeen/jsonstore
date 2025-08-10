"use client";

import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import Link from "next/link";

type Action = {
    id: string;
    label: string;        // texto do tooltip
    iconClass: string;    // ex.: "bi bi-share"
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
};

type TextProps = {
    title: string;
    description?: string;
    actions?: Action[];
    className?: string;
};

const defaultActions: Action[] = [
    { id: "share", label: "Compartilhar", iconClass: "bi bi-share" },
    { id: "chat", label: "Mensagens", iconClass: "bi bi-chat-dots" },
];

export default function Text({
                                 title,
                                 description,
                                 actions = defaultActions,
                                 className = "",
                             }: TextProps) {
    return (
        <section className={`py-0 ${className}`}>
            <div className="container">
                {/* linha do título + botões */}
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-12">
                        <div className="d-flex align-items-center justify-content-between gap-2">
                            <h1 className="h3 fw-semibold my-0">{title}</h1>

                            <div className="d-flex align-items-center gap-2">
                                {actions.map((act) => {
                                    const btnClasses =
                                        "btn btn-outline-primary d-inline-flex align-items-center justify-content-center rounded-3";
                                    const styleSquare: React.CSSProperties = {
                                        width: 36,
                                        height: 36,
                                        padding: 0,
                                    };

                                    const buttonContent = (
                                        <>
                                            <i className={act.iconClass} aria-hidden="true" />
                                            <span className="visually-hidden">{act.label}</span>
                                        </>
                                    );

                                    const btnElement = act.href ? (
                                        <Link
                                            href={act.href}
                                            className={btnClasses}
                                            style={styleSquare}
                                            onClick={act.onClick}
                                        >
                                            {buttonContent}
                                        </Link>
                                    ) : (
                                        <Button
                                            variant="outline-primary"
                                            className="rounded-3 p-0 d-inline-flex align-items-center justify-content-center"
                                            style={styleSquare}
                                            onClick={act.onClick}
                                        >
                                            {buttonContent}
                                        </Button>
                                    );

                                    return (
                                        <OverlayTrigger
                                            key={act.id}
                                            placement="top"
                                            trigger="click"
                                            overlay={<Tooltip id={`tooltip-${act.id}`}>{act.label}</Tooltip>}
                                            rootClose
                                        >
                                            {btnElement}
                                        </OverlayTrigger>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* linha da descrição */}
                {description && (
                    <div className="row mt-2 py-5">
                        <div className="col-md-6 offset-md-3 col-12">
                            <p style={{ whiteSpace: "pre-line" }} className="mb-0">
                                {description}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
