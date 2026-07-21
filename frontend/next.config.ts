import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/python-todo-app",
  images: {
    unoptimized: true,
  },

  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
