'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import {useTransitionDirection} from "@/app/contexts/transition-context";

export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { direction } = useTransitionDirection();

    const variants = {
        initial: (dir: number) => ({
            // NOVA página entra: se "ir" (dir>0), começa levemente da direita
            x: dir > 0 ? 40 : -40,
            opacity: 0,
            position: 'absolute' as const,
            width: '100%',
        }),
        enter: {
            x: 0,
            opacity: 1,
            position: 'relative' as const,
        },
        exit: (dir: number) => ({
            // PÁGINA antiga sai: se "ir", desliza para a esquerda; se "voltar", para a direita
            x: dir > 0 ? -40 : 40,
            opacity: 0,
            position: 'absolute' as const,
            width: '100%',
        }),
    };

    return (
        <div className="relative overflow-hidden min-h-screen">
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={pathname}
                    variants={variants}
                    custom={direction}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    transition={{ type: 'tween', duration: 0.28, ease: 'easeInOut' }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
