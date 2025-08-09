import Link from "next/link";
import Image from "next/image";

export default function Cover() {
    return (
        <section className="py-5 p-30-section mt-5">
            <div className="container">
                <div className="row">
                    {/* vendedor */}
                    <div className="col-md-6 offset-md-3 col-12">
                        <div className="row align-items-center">
                            {/* avatar */}
                            <div className="col-md-3 col-4 d-flex align-items-center justify-content-center">
                                <Link href="https://gramstore.com.br/nbz" className="text-decoration-none">
                                    <article className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: 96, height: 96 }}>
                                        <div className="position-relative rounded-circle overflow-hidden" style={{ width: 88, height: 88 }}>
                                            <Image
                                                src="https://gramstore.com.br/storage/23371/logo-loja-juliana-4.png"
                                                alt="logo Loja da Juliana"
                                                fill
                                                sizes="96px"
                                                style={{ objectFit: "cover" }}
                                                priority
                                            />
                                        </div>
                                    </article>
                                </Link>
                            </div>

                            {/* texto */}
                            <div className="col-md-9 col-8 d-flex align-items-center">
                                <div className="w-100">
                                    <h1 className="mb-0 mt-1 font-700 title-md pt-2 h4">Loja da Juliana</h1>
                                    <p className="small text-muted mb-0">{/* subtítulo opcional aqui */}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /fim vendedor */}
                </div>
            </div>
        </section>
    );
}
