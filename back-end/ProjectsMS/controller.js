/* DEPENDENCIES */

const express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
const passport = require("passport");

/* ----------------- */
/*  APP CONFIG       */
/* ----------------- */

const app = express();
const projectsRouter = require("./routes/projects");
const passportMiddleware = require("./utils/passport");

app.use(express.json());

app.set("superSecret", process.env.SECRET || "youreismysecretbaby");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use(morgan("dev"));

app.use(passport.initialize());
app.use(passport.session());
passportMiddleware(passport);

/* ----------------- */
/* SERVICE ENDPOINTS */
/* ----------------- */

app.use("/projects", projectsRouter);

app.get("/", function (req, res) {
  res.status(200).send({
    message: "Projects MS is working well :)",
  });
});

app.use(express.static(__dirname + "/"));
module.exports = app;
