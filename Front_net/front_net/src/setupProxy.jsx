const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://localhost:7220',
            changeOrigin: true,
            secure: false, // pour ignorer les certificats SSL non sécurisés
        })
    );
};
