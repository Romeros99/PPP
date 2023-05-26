const { createProxyMiddleware } = require('http-proxy-middleware');

//Redirección con Proxy para cada API y su puerto correspondiente
module.exports = function(app){
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
  app.use(
    '/omega',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};