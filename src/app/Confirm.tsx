// app/components/Confirm.tsx
"use client";


import {FaArrowsToCircle, FaBackwardStep} from "react-icons/fa6";
import {FaArrowCircleLeft, FaArrowCircleRight, FaStoreAlt} from "react-icons/fa";


type ConfirmProps = {
    label?: string; // texto do botão principal (esquerda)
    onAddMore?: () => void; // ação do botão menor (direita)
};

export default function Confirm({
                                    label = "FINALIZAR",
                                    onAddMore,
                                }: ConfirmProps) {
    return (
        <div
            className="position-fixed bottom-0 start-0 end-0 bg-body border-top"
            style={{ zIndex: 1050 }}
        >
            <div className="container py-3">
                <div
                    className="row g-2 align-items-stretch"
                >
                    <div className="col-10">
                        <button
                            type="submit"
                            form="list-form"
                            className="btn btn-primary btn-lg fw-semibold text-uppercase w-100 h-100"
                        >
                            {label}
                        </button>
                    </div>

                    <div className="col-2">
                        <button
                            type="button"
                            className="btn btn-outline-primary btn-lg w-100 h-100 d-flex align-items-center justify-content-center"
                            aria-label="Voltar"
                            onClick={onAddMore}
                        >
                            <FaStoreAlt size={22} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
