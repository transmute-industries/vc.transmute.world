const express = require('express');

const app = express();

app.use('/api/', require('./routes'));

module.exports = app;
