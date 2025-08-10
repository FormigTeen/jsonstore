'use client'

import Link from "next/link";
import Image from "next/image";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import { FaShoppingBag } from "react-icons/fa";

// Props are optional; you can wire these up to your store/cart state later
type HeaderProps = {
    cartCount?: number;
    brandHref?: string;
    cartHref?: string;
};

export default function Header({
                                   cartCount = 0,
                                   brandHref = "https://gramstore.com.br/nbz",
                                   cartHref = "https://gramstore.com.br/nbz/carrinho",
                               }: HeaderProps) {
    return (
        <>
            <div className="pt-5 pt-lg-5"></div>
            <Navbar
                fixed="top"
                expand="lg"
                bg="white"
                variant="light"
                className="border-bottom p-0"
                style={{ zIndex: 2000 }}
            >
                <Container>
                    {/* Brand */}
                    <Navbar.Brand as={Link} href={brandHref} aria-label="Loja da Juliana" className="w-75 d-flex align-items-center gap-2 font-13 font-600">
          <span className="d-inline-block rounded-circle overflow-hidden" style={{ width: 30, height: 30 }}>
            <Image
                src="https://gramstore.com.br/storage/23371/logo-loja-juliana-4.png"
                alt="logo Loja da Juliana"
                width={30}
                height={30}
                style={{ objectFit: "cover" }}
            />
          </span>
                        <span className="text-truncate" style={{ maxWidth: 160 }}>Loja da Juliana</span>
                    </Navbar.Brand>

                    {/* If you plan to add more nav items later, keep the toggle/collapse */}
                    {/* Carrinho fora do Collapse => sempre visível */}
                    <Nav className="ms-auto align-items-center order-lg-2">
                        <Nav.Link as={Link} href={cartHref} className="d-flex align-items-center gap-1 px-0 fw-bold">
                            <FaShoppingBag aria-hidden="true" />
                            <Badge bg="primary" className="ms-1">{cartCount}</Badge>
                            <span className="visually-hidden">Ir para o carrinho</span>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
