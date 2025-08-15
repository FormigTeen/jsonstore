import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
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
};

export default nextConfig;
