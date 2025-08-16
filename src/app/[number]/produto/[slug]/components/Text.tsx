"use client";
import {Product} from "@/app/services/stores";

type TextProps = {
    product: Product;
    className?: string;
};

export default function Text({ product, className = "" }: TextProps) {
    const styleSquare: React.CSSProperties = {
        width: 36,
        height: 36,
        padding: 0,
    };

    return (
        <section className={`py-0 ${className}`}>
            <div className="container">
                {/* linha da descrição */}
                {product.description && (
                    <div className="row pb-5 pt-3">
                        <div className="col-md-6 offset-md-3 col-12">
                            <p className="font-700 font-14 mb-2">Informações do produto</p>
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
