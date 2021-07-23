/*
This file makes it so all requests to localhost:3000 will go to localhost:5000
if React server doesn't know the route. This is useful for proxying backend
requests
*/

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/socket.io", {
      target: "http://localhost:5000",
      ws: true,
    })
  );
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:5000",
      ws: true,
    })
  );
};
