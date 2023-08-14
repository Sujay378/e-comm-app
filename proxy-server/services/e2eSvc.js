const router = require('express').Router();
const cryptoJs = require('crypto-js');

const Session = require('../models/sessionModel');
const { generateKey } = require('../util');

router.get('/key', (req, res) => {
  const { sessionid } = req.headers;

  const key = generateKey();
  Session.adde2eKey(sessionid, key, (err) => {
    if(err) return res.status(400).json({
      type: "dbInjectionFailure"
    }).end();

    res.status(200).json({ encryptedKey: key }).end();
  })
});

module.exports = router;
