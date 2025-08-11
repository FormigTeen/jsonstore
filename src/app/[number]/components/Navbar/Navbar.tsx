'use client'
import Link from "next/link";
import Image from "next/image";
import NavbarBase from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import {FaShoppingBag} from "react-icons/fa";
import { Pages, Store} from "@/app/services/stores";
import {useStore} from "@/app/[number]/hooks/useStore";

type Props = {
    store: Store
}

export default function Navbar({ store }: Props) {

    const cartCount = 0
    const { title, logoUrl, getPageUrl } = useStore(store)

    const navbarBaseProps = {
        fixed: "top",
        expand: "lg",
        bg: "white",
        variant: "light",
        className: "border-bottom p-0",
        style: { zIndex: 2000 }
    } as const

    return (
        <>
            <Block />
            <NavbarBase {...navbarBaseProps}>
                <Container>
                    <NavbarBase.Brand
                        as={Link}
                        href={getPageUrl(Pages.HOME)}
                        aria-label={title}
                        className="w-75 d-flex align-items-center gap-2 font-13 font-600"
                    >
                        <span className="d-inline-block rounded-circle overflow-hidden" style={{ width: 30, height: 30 }}>
                            <Image
                                src={logoUrl}
                                alt={`Logo de ${title}`}
                                width={30}
                                height={30}
                                style={{ objectFit: "cover" }}
                            />
          </span>
                        <span className="text-truncate" style={{ maxWidth: 160 }}>{title}</span>
                    </NavbarBase.Brand>
                    <Nav className="ms-auto align-items-center order-lg-2">
                        <Nav.Link
                            as={Link}
                            href={getPageUrl(Pages.CART)}
                            className="d-flex align-items-center gap-1 px-0 fw-bold"
                        >
                            <FaShoppingBag aria-hidden="true" />
                            <Badge bg="primary" className="ms-1">{cartCount}</Badge>
                            <span className="visually-hidden">Ir para o carrinho</span>
                        </Nav.Link>
                    </Nav>
                </Container>
            </NavbarBase>
        </>
    );
}

const Block = () => (
    <div className="pt-5 pt-lg-5"></div>
)
