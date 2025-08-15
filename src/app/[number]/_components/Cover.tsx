import Link from "next/link";
import Image from "next/image";
import {Pages, Store} from "@/app/services/stores";
import {useStore} from "@/app/[number]/hooks/useStore";

type Props = {
    store: Store
}

export default function Cover({ store } : Props) {

    const { title, getPageUrl, logoUrl } = useStore(store)

    return (
        <section className="py-5 p-30-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-12">
                        <div className="row align-items-center">
                            <div className="col-md-3 col-4 d-flex align-items-center justify-content-center">
                                <Link href={getPageUrl(Pages.HOME)} className="text-decoration-none">
                                    <article className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: 96, height: 96 }}>
                                        <div className="position-relative rounded-circle overflow-hidden" style={{ width: 88, height: 88 }}>
                                            <Image
                                                src={logoUrl}
                                                alt={`Logo de ${title}`}
                                                fill
                                                sizes="96px"
                                                style={{ objectFit: "cover" }}
                                                priority
                                            />
                                        </div>
                                    </article>
                                </Link>
                            </div>

                            <div className="col-md-9 col-8 d-flex align-items-center">
                                <div className="w-100">
                                    <h1 className="mb-0 mt-1 font-700 title-md pt-2 h4">{title}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
