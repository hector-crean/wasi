/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // WASI components configuration
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    // Add resolvers for WASI modules to use our mocks during build
    config.resolve.alias = {
      ...config.resolve.alias,
      'wasi:graphics-context/graphics-context': path.resolve(__dirname, './www/src/pkg/mocks/wasi-shim.js'),
      'wasi:surface/surface': path.resolve(__dirname, './www/src/pkg/mocks/wasi-shim.js'),
      'wasi:webgpu/webgpu': path.resolve(__dirname, './www/src/pkg/mocks/wasi-shim.js'),
    };

    // Configure webpack to properly handle WASI component modules
    config.module.rules.push({
      test: /\.component\.js$/,
      type: 'javascript/auto',
    });

    // Handle external WASI imports
    config.externals = [
      ...config.externals || [],
      ({ request }, callback) => {
        // Only externalize actual WASI runtime imports, not our mocks
        if (request.startsWith('wasi:') && !request.includes('mocks')) {
          return callback(null, 'commonjs ' + request);
        }
        callback();
      },
    ];

    return config;
  },
};

module.exports = nextConfig; 