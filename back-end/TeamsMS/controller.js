/* DEPENDENCIES */

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const morgan = require('morgan');

/* ----------------- */
/*  APP CONFIG       */
/* ----------------- */

const app = express();
const teamsRouter = require('./routes/teams');

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front-end/build')));

app.use('/teams', teamsRouter);

module.exports = app;
