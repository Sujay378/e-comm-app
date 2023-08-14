//External imports
const express = require('express');
const bodyParder = require('body-parser');
const cors = require('cors');

//Built-in imports
const http = require('http');

//Custom middleware/utiliy imports
const contSvc = require('./services/contentSvc');
const authSvc = require('./services/authSvc');
const sessionSvc = require('./services/sessionSvc');
const e2eSvc = require('./services/e2eSvc');
const { getEnvPath } = require('./helpers/getFilePath');

//Adding Environment variables to Process env
require('dotenv').config({ path: getEnvPath() })

const app = express();

app.use(cors());
app.use(bodyParder.urlencoded({extended: false}));
app.use(bodyParder.json());

app.use((req, res, next) => {
  Object.keys(req.headers).forEach(header => res.setHeader(header, req.get(header)));
  next();
})

app.use('/content', contSvc);

app.use('/auth', authSvc);

app.use('/session', sessionSvc);

app.use('/encryption', e2eSvc);

const server = http.createServer(app);

server.listen(process.env.NODE_PORT, () => console.log(`http://localhost:${process.env.NODE_PORT}/`));

