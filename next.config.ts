import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production'
const repoBase = process.env.NEXT_BASE_PATH ?? ''



const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL('https://gramstore.com.br/storage/**'),
        ],
    },
    basePath: isProd ? repoBase : '',
    assetPrefix: isProd && repoBase ? `${repoBase}/` : undefined,
};

export default nextConfig;
