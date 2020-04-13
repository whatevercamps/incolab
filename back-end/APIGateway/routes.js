const express = require("express");
const path = require("path");
const httpProxy = require("express-http-proxy");
const userServiceProxy = httpProxy("http://localhost:3030/", {
  proxyReqPathResolver: (req) => {
    return `/users${req.url}`;
  },
});
const teamsServiceProxy = httpProxy("http://localhost:3028/", {
  proxyReqPathResolver: (req) => {
    const url = `/teams${req.url}`;
    console.log("url", url);
    return url;
  },
});

const teamProjectsServiceProxy = httpProxy("http://localhost:3028/", {
  proxyReqPathResolver: (req) => {
    const url = `/projects${req.url}`;
    console.log("url", url);
    return url;
  },
});

const projectsServiceProxy = httpProxy("http://localhost:3029/");

const app = express();

app.post("/register", userServiceProxy);

app.post("/authenticate", userServiceProxy);

app.get("/profile", userServiceProxy);

app.get("/logout", userServiceProxy);

app.get("/getAuthTeams", teamsServiceProxy);
app.get("/getTeam/:id", teamsServiceProxy);

app.post("/teams", teamsServiceProxy);

app.get("/projects", projectsServiceProxy);

app.get("/getProjectsTeam", teamProjectsServiceProxy);

app.post("/createProjectTeam", teamProjectsServiceProxy);

app.use("*", (req, res) => {
  console.log("req", req.url);
  res.status(404).json({ success: false, error: "URL not found :(" });
});

app.use(express.static(path.join(__dirname, "front-end/build")));

module.exports = app;
