const express = require("express");
const app = express();
const routes = require('./api/routes/positions')

app.use('/positions', routes);

module.exports = app;
