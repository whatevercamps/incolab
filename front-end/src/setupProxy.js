const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app){
    app.use('/users', createProxyMiddleware({ target: 'http://localhost:3030/' }));
    app.use('/proyects', createProxyMiddleware({ target: 'http://localhost:3029/' }));
    app.use('/teams', createProxyMiddleware({ target: 'http://localhost:3028/' }));
}
