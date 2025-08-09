import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL('https://gramstore.com.br/storage/**'),
        ],
    },
};

export default nextConfig;
