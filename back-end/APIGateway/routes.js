const express = require("express");
const httpProxy = require("express-http-proxy");
const userServiceProxy = httpProxy("http://localhost:3030/", {
  proxyReqPathResolver: (req) => {
    return `/users${req.url}`;
  },
});
const teamsServiceProxy = httpProxy("http://localhost:3029/");
const projectsServiceProxy = httpProxy("http://localhost:3028/");

const app = express();

app.post("/register", userServiceProxy);

app.post("/authenticate", userServiceProxy);

app.get("/profile", userServiceProxy);

app.get("/teams", teamsServiceProxy);

app.post("/teams", teamsServiceProxy);

app.get("/projects", projectsServiceProxy);

app.post("/projects", projectsServiceProxy);

app.use("*", (req, res) => {
  res.status.json({ success: false, error: "URL not found :(" });
});

module.exports = app;
