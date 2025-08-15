import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";
import {FaStore} from "react-icons/fa6";

interface TitleCartProps {
    total: number;
    continueHref?: string;
    continueLabel?: string;
}

export default function TitleCart({
                                      total,
                                      continueHref = "/",
                                      continueLabel = "ver catálogo",
                                  }: TitleCartProps) {
    const formattedTotal = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return (
        <section>
            <div className="container">
                <div className="row">
                    {/* Título e total */}
                    <div className="col-md-3 offset-md-3 col-5">
                        <h1 className="h3 font-500 my-0 d-flex align-items-center">
                            <FaShoppingBag className="me-2" />
                            Sacola
                        </h1>
                        <p className="h5 font-700 text-primary mt-1 mb-0 pb-0 cart-total">
                            {formattedTotal}
                        </p>
                    </div>

                    {/* Botão continuar comprando */}
                    <div className="col-md-3 col-7">
                        <Link href={continueHref} className="btn btn-block btn-sm border btn-light font-700 p-2 font-10 text-uppercase">
                            <FaStore className="me-2" />
                            {continueLabel}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
