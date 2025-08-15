'use client';
import { useRouter, usePathname } from 'next/navigation';
import type { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {useTransitionDirection} from "@/app/contexts/transition-context";

type Dir = 1 | -1;
type DirOpt = { dir?: Dir | 'auto' };

export function useDirectionalRouter() {
    const router = useRouter();
    const pathname = usePathname();
    const { setDirection } = useTransitionDirection();

    const resolveDir = (to: string, dir: Dir | 'auto' = 'auto'): Dir => {
        if (dir === 1 || dir === -1) return dir;
        const curr = (pathname || '').split('/').filter(Boolean).length;
        const next = (to || '').split('/').filter(Boolean).length;
        return next >= curr ? 1 : -1; // mais profundo = "ir" (→), menos profundo = "voltar" (←)
    };

    const push = (to: string, opts?: NavigateOptions & DirOpt) => {
        setDirection(resolveDir(to, opts?.dir ?? 'auto'));
        router.push(to, opts);
    };

    const replace = (to: string, opts?: NavigateOptions & DirOpt) => {
        setDirection(resolveDir(to, opts?.dir ?? 'auto'));
        router.replace(to, opts);
    };

    const back = () => { setDirection(-1); router.back(); };
    const forward = () => { setDirection(1); router.forward(); };

    const prefetch = (to: string) => router.prefetch?.(to);

    return { push, replace, back, forward, prefetch };
}
