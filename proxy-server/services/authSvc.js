const fs = require('fs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const uniqid = require('uniqid')
const User = require('../models/userModel');

const getKey = () => fs.readFileSync('./proxy-server/secret.txt');

router.post('/register', (req, res) => {
  const { name, email, password, admin } = req.body;

  if(!(name && email && password)) return res.status(400).json({
    type: "dataNotComplete",
    message: "Insufficient data provided"
  }).end();

  User.getSingleUser(email, user => {
    if(user) return res.status(400).json({
      type: "existingUser",
      message: "User already exists"
    }).end();

    const id = uniqid('', email);
    User.registerNewUser({
      ...req.body,
      id,
      admin: admin || false
    }, err => {
      if(err) return res.status(400).json({
        type: "failedRegistration",
        message: "DB insertion failed"
      }).end();

      res.status(200).json({
        message: "Account created Successfully"
      }).end();
    })
  })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.getSingleUser(email, user => {
    if(!user) return res.status(400).json({
      type: "invalidUser",
      message: "user not found"
    }).end();

    if(user.password === password) {
      const key = getKey();
      jwt.sign({ id: user.id }, key, { expiresIn: '1h' }, (err, token) => {
        if(err) res.status(400).json({
          type: "keygenFailed",
          message: "key generation failed"
        }).end();
        res.status(200).json({ ...user, token }).end();
      });
    } else res.status(400).json({
      type: "invalidCredentials",
      message: "Password mismatch"
    })
  });
})

module.exports = router;
