'use client';
import Link, { LinkProps } from 'next/link';
import React, { MouseEvent } from 'react';
import {useTransitionDirection} from "@/app/contexts/transition-context";
import {isString} from "@/app/services/string";

type Dir = 1 | -1;
type Props = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    direction?: Dir | 'auto';
};

export default function TransitionLink({
                                           href,
                                           onClick,
                                           direction = 'auto',
                                           ...rest
                                       }: Props) {
    const { setDirection } = useTransitionDirection();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented) return;

        // não marque direção se abrir nova aba, etc.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || rest.target === '_blank') return;

        let dir: Dir = 1;
        if (direction === -1 || direction === 1) {
            dir = direction;
        } else {
            // 'auto' — tenta inferir por profundidade do path
            const curr = window.location.pathname.split('/').filter(Boolean).length;
            const nextPath = href ?? window.location.pathname;
            const next = (nextPath || '').split('/').filter(Boolean).length;
            dir = next >= curr ? 1 : -1;
        }

        setDirection(dir);
    };

    return (
        <Link href={href} onClick={handleClick} {...rest} />
    );
}
