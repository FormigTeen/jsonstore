'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function RouteNormalizer() {
    const router = useRouter()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const p = params.get('p')
        if (p) {
            const url = decodeURIComponent(p)
            // limpa a barra de endereço (tira ?p=) e navega
            window.history.replaceState({}, '', url)
            router.replace(url)
        }
    }, [router])

    return null
}
