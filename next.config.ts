import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'
const repoBase = process.env.NEXT_BASE_PATH ?? ''



const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // necessário para export estático
        remotePatterns: [
            {
                protocol: "https",
                hostname: "gramstore.com.br",
                port: "",
                pathname: "/storage/**",
            },
        ],
    },
    basePath: isProd ? repoBase : '',
    assetPrefix: isProd && repoBase ? `${repoBase}/` : undefined,
};

export default nextConfig;
