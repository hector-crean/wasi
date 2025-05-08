import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer, dev }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    // Add special handling for WASM files
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    });

    // For server-side, provide empty mock for WASM modules to prevent errors
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    return config;
  },
  // Add error handler for dev server
  onDemandEntries: {
    // Keep the pages in memory for longer to reduce rebuilds
    maxInactiveAge: 60 * 60 * 1000,
    // Maximum number of pages to keep in memory
    pagesBufferLength: 5,
  },
};

export default nextConfig;
