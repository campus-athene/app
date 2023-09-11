import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy()],
  server: {
    proxy: {
      '/campusnet-proxy': {
        target:
          process.env.VITE_CAMPUSNET_BASE_URL ||
          'https://www.tucan.tu-darmstadt.de',
        rewrite: (path) => path.replace(/^\/campusnet-proxy/, ''),
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            if (req.headers['safe-cookie'])
              proxyReq.setHeader('Cookie', req.headers['safe-cookie']);
          }),
            proxy.on('proxyRes', (proxyRes, req, res) => {
              if (proxyRes.headers['set-cookie'])
                res.setHeader(
                  'Safe-Set-Cookie',
                  proxyRes.headers['set-cookie'],
                );
            }),
            proxy.on('error', (err, req, res) => {
              console.error(err);
            });
        },
      },
    },
  },
});
