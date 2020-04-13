/* DEPENDENCIES */

const express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");

/* ----------------- */
/*  APP CONFIG       */
/* ----------------- */

const app = express();
const projectsRouter = require("./routes/projects");

app.use(express.json());

app.set("superSecret", process.env.SECRET || "youreismysecretbaby");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use(morgan("dev"));

/* ----------------- */
/* SERVICE ENDPOINTS */
/* ----------------- */

app.use("/projects", projectsRouter);

app.get("/", function (req, res) {
  res.status(200).send({
    message: "Projects MS is working well :)",
  });
});

module.exports = app;
