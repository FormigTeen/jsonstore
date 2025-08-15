'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Dir = 1 | -1;
type Ctx = { direction: Dir; setDirection: (d: Dir) => void };

const TransitionContext = createContext<Ctx | null>(null);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
    const [direction, setDirection] = useState<Dir>(1);

    useEffect(() => {
        const onPopState = () => setDirection(-1); // voltar
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    return (
        <TransitionContext.Provider value={{ direction, setDirection }}>
            {children}
        </TransitionContext.Provider>
    );
}

export function useTransitionDirection() {
    const ctx = useContext(TransitionContext);
    if (!ctx) throw new Error('useTransitionDirection deve ser usado dentro de <TransitionProvider>');
    return ctx;
}
