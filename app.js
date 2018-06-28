const express = require("express");
const app = express();
const routes = require('./api/routes/positions')
const stops = require('./api/routes/stops')

app.use('/positions', routes);
app.use('/stops', stops);

// app.use((req, res, next) => {
//     const error = new Error('Not found');
//     error.status(404);
//     next(error);
// });

// app.use((err, req, res, next) => {
//     res.status(404);
//     next(err.status || 500);
// });

module.exports = app;
