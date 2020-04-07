/* DEPENDENCIES */

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

/* ----------------- */
/*  APP CONFIG       */
/* ----------------- */

const app = express();
const teamsRouter = require('./routes/teams');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/teams', teamsRouter);

module.exports = app;
