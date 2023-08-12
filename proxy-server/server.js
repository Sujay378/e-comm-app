//External imports
const express = require('express');
const bodyParder = require('body-parser');
const cors = require('cors');

//Built-in imports
const http = require('http');

//Custom middleware/utiliy imports
const contSvc = require('./services/contentSvc');
const authSvc = require('./services/authSvc');
const { getEnvPath } = require('./helpers/getFilePath')

//Adding Environment variables to Process env
require('dotenv').config({ path: getEnvPath() })

const app = express();

app.use(cors());
app.use(bodyParder.urlencoded({extended: false}));
app.use(bodyParder.json());

app.use('/content', contSvc);

app.use('/auth', authSvc);

const server = http.createServer(app);

server.listen(process.env.NODE_PORT, () => console.log(`http://localhost:${process.env.NODE_PORT}/`));

