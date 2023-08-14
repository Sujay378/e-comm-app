const router = require('express').Router();
const jwt = require('jsonwebtoken');
const uniqid = require('uniqid');
const cryptoJs = require('crypto-js');

const User = require('../models/userModel');
const Session = require('../models/sessionModel');
const { generateKey } = require('../util')


router.post('/register', (req, res) => {
  const { name, email, password, admin } = req.body;
  const { sessionid } = req.headers;

  if(!(name && email && password)) return res.status(400).json({
    type: "dataNotComplete",
    message: "Insufficient data provided"
  }).end();

  Session.getCurrentSession(sessionid, (err, data) => {
    if(err) return res.status(400).json(err).end();

    if(data['e2eKey']) return res.status(400).json({
      type: 'invalidKey'
    }).end();

    const decryptedPassword = cryptoJs.AES.decrypt(password, data.e2eKey);

    Session.removeKey(sessionid, 'e2eKey', (err) => {
      if(err) return res.status(400).json(err).end();

      User.getSingleUser(email, user => {
        if(user) return res.status(400).json({
          type: "existingUser",
          message: "User already exists"
        }).end();

        const id = uniqid();
        User.registerNewUser({
          ...req.body,
          password: decryptedPassword,
          id,
          admin: admin || false
        }, err => {
          if(err) return res.status(400).json({
            type: "failedRegistration",
            message: "DB insertion failed"
          }).end();

          const key = generateKey();
          Session.addAuthKey(sessionid, key);
          jwt.sign({id}, key, {expiresIn: '1h'}, (err, token) => {
            if(err) res.status(400).json({
              type: "keygenFailed",
              message: "key generation failed"
            }).end();

            res.status(200).json({token, name, email, admin: admin || false}).end();
          })
        })
      })
    })
  })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const { sessionid } = req.headers;

  Session.getCurrentSession(sessionid, (err, data) => {
    if(err) return res.status(400).json(err).end();

    const decryptedPassword = cryptoJs.AES.decrypt(password, data.e2eKey);

    Session.removeKey(sessionid, 'e2eKey', (err) => {
      if(err) return res.status(400).json(err).end();

      User.getSingleUser(email, user => {
        if(!user) return res.status(400).json({
          type: "invalidUser",
          message: "user not found"
        }).end();

        if(user.password === decryptedPassword) {
          const key = generateKey();
          Session.addAuthKey(sessionid, key);
          jwt.sign({ id: user.id }, key, { expiresIn: '1h' }, (err, token) => {
            if(err) res.status(400).json({
              type: "keygenFailed",
              message: "key generation failed"
            }).end();
            const userData = {
              name: user.name,
              email: user.email,
              admin: user.admin
            }
            res.status(200).json({ ...userData, token }).end();
          });
        } else res.status(400).json({
          type: "invalidCredentials",
          message: "Password mismatch"
        }).end();
      });
    })
  })
})

module.exports = router;
