//External imports
const express = require('express');
const bodyParder = require('body-parser');
const cors = require('cors');

//Built-in imports
const http = require('http');

//Custom middleware/utiliy imports
const contSvc = require('./services/contentSvc');
const { getEnvPath } = require('./helpers/getFilePath')

//Adding Environment variables to Process env
require('dotenv').config({ path: getEnvPath() })

const app = express();

app.use(cors());
app.use(bodyParder.urlencoded({extended: false}));

app.use('/content', contSvc);

const server = http.createServer(app);

server.listen(process.env.NODE_PORT);

