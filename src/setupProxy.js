// Configures the proxy for the webpack development server. Not used in production.

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Rewrite requests to /campusnet-proxy to TUCaN. The 'Safe-Cookie' header
  // is copied to the forbidden request header 'Cookie' and the forbidden
  // response header 'Set-Cookie' is copied to 'Safe-Set-Cookie'.
  app.use(
    '/campusnet-proxy',
    createProxyMiddleware({
      target:
        process.env.REACT_APP_CAMPUSNET_BASE_URL ||
        'https://www.tucan.tu-darmstadt.de',
      pathRewrite: { '^/campusnet-proxy': '' },
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        if (req.headers['safe-cookie'])
          proxyReq.setHeader('cookie', req.headers['safe-cookie']);
      },
      onProxyRes: (proxyRes, req, res) => {
        if (proxyRes.headers['set-cookie'])
          res.setHeader('safe-set-cookie', proxyRes.headers['set-cookie']);
      },
    })
  );
};
