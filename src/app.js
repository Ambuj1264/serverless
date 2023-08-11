const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const connection = require('./utils/db');

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);

module.exports.handler = serverless(app);
