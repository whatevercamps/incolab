/* DEPENDENCIES */

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const morgan = require("morgan");

const passport = require("passport");
const passportMiddleware = require("./utils/passport");

/* ----------------- */
/*  APP CONFIG       */
/* ----------------- */

const app = express();
const teamsRouter = require("./routes/teams");

app.use(bodyParser.json());
app.use(morgan("dev"));
app.set("superSecret", process.env.SECRET || "youreismysecretbaby");

app.use(passport.initialize());
app.use(passport.session());
passportMiddleware(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front-end/build")));

app.use("/teams", teamsRouter);

module.exports = app;
