'use client';
import Image from 'next/image';
import { useState, FormEvent } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import stores from '../services/stores.json';
import {useDirectionalRouter} from "@/app/_hooks/useDirectionalRouter";

type Props = {
    logoUrl: string;
    className?: string;
};

export default function Hero({
                                        logoUrl,
                                        className = '',
                                    }: Props) {
    const makeHref = (code: string) => `/${encodeURIComponent(code)}`
    const router = useDirectionalRouter();
    const [code, setCode] = useState('');
    const [touched, setTouched] = useState(false);
    const [hasError, setHasError] = useState(false);
    const isInvalid = touched && code.trim() === '' || hasError;

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const value = code.replace(" ", "").trim();
        if (!value) {
            setTouched(true);
            return;
        }
        if ( !(value in stores) ) {
            setTouched(true);
            setHasError(true);
            return;
        }
        router.push(makeHref(value));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase();
        setCode(value);
        setTouched(true);
        if ( hasError ) {
            setHasError(false);
        }
    }

    return (
        <section className={`min-vh-100 d-flex align-items-center ${className}`}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6} className="text-center">
                        {/* Logo */}
                        <div className="d-flex justify-content-center mb-4">
              <span
                  className="d-inline-block rounded-circle overflow-hidden bg-light"
                  style={{ width: 96, height: 96 }}
              >
                <Image
                    src={logoUrl}
                    alt="Logo"
                    width={96}
                    height={96}
                    style={{ objectFit: 'cover' }}
                    priority
                />
              </span>
                        </div>

                        <Form noValidate onSubmit={onSubmit} className="text-start">
                            <Form.Label
                                htmlFor="catalogCode"
                                className="h4 fw-semibold mb-3 d-block text-center"
                            >
                                Digite o Código do Catálogo
                            </Form.Label>

                            <InputGroup size="lg">
                                <Form.Control
                                    id="catalogCode"
                                    type="text"
                                    placeholder="EX.: 12345"
                                    value={code}
                                    onChange={handleChange}
                                    onBlur={() => setTouched(true)}
                                    isInvalid={isInvalid}
                                    aria-describedby="goBtn"
                                    className="text-uppercase"
                                />
                                <Button id="goBtn" type="submit" variant="primary">
                                    VER CATÁLOGO
                                </Button>
                                <Form.Control.Feedback type="invalid">
                                    Informe um código válido.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
