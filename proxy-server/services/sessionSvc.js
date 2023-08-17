const router = require('express').Router();
const util = require('../util');
const Session = require('../models/sessionModel');

router.get('/generate', (req, res) => {
  Session.generateNewSession((err, data) => {
    if(err) return res.status(400).json(err).end();
    res.status(200).json(data).end();
  })
})

router.post('/end', (req, res) => {
  const { sessionid } = req.headers;
  Session.removeSession(sessionid);
  res.status(200).json({message: 'Session ended'}).end();
})

module.exports = router;
