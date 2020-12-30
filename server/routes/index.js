const express = require('express');

const app = express();

//app.use(require('./login'));
app.use(require('./materia'));
app.use(require('./tema'));
app.use(require('./pregunta'));

module.exports = app;