const jwt = require("jsonwebtoken");
const cryptoJs = require("crypto-js");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Session = require("../models/session");
const { generateKey } = require("../util");

const register = (req, res) => {
  const { name, email, phone, password, admin } = req.body;
  const { sessionid } = req.headers;
  let decryptedPassword, currSession;

  if (!(name && email && phone && password))
    return res
      .status(400)
      .json({
        type: "dataNotComplete",
        message: "Insufficient data provided",
      })
      .end();

  Session.findById(sessionid)
    .then((session) => {
      if (!session.encryptionKey)
        return Promise.reject({
          type: "invalidKey",
          message: "encryption key not found",
        });

      decryptedPassword = cryptoJs.AES.decrypt(
        password,
        session.encryptionKey
      ).toString(cryptoJs.enc.Utf8);
      session.encryptionKey = undefined;
      currSession = session;

      return User.findOne({ email: email });
    })
    .then((user) => {
      if (user)
        return Promise.reject({
          type: "existingUser",
          message: "User already exists",
        });

      return bcrypt
        .hash(decryptedPassword, 12)
        .then((hashedPassword) => {
          return User.create({
            userName: name,
            email: email,
            phone: phone,
            password: hashedPassword,
            admin: admin || false,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({
            type: "userCreationFailed",
            message: "Password hashing returned error",
          });
        });
    })
    .then((user) => {
      const authKey = generateKey();
      const authToken = jwt.sign({ id: user._id.toString() }, authKey, {
        expiresIn: "1h",
      });
      currSession.authKey = authKey;
      // currSession.authToken = authToken;
      currSession.user = user._id;
      currSession
        .save()
        .then((session) => {
          res
            .set({ Authorize: authToken })
            .status(200)
            .json({
              name: user.userName,
              email: user.email,
              phone: user.phone,
              admin: user.admin,
            })
            .end();
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({
            type: "failedToUpdateSession",
            message: "failed to update session DB",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err).end();
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const { sessionid } = req.headers;
  let decryptedPassword, currSession;

  Session.findById(sessionid)
    .then((session) => {
      if (!session)
        return Promise.reject({
          type: "invalidSession",
          message: "Session not found",
        });
      if (!session.encryptionKey)
        return Promise.reject({ type: "missingEncriptionKey" });

      currSession = session;
      decryptedPassword = cryptoJs.AES.decrypt(
        password,
        session.encryptionKey
      ).toString(cryptoJs.enc.Utf8);

      return User.findOne({ email });
    })
    .then((user) => {
      if (!user)
        return Promise.reject({
          type: "invalidUser",
        });

      bcrypt.compare(decryptedPassword, user.password).then((matched) => {
        if (!matched)
          return res.status(400).json({ type: "invalidUser" }).end();

        const key = generateKey();
        currSession.authKey = key;
        currSession.encryptionKey = undefined;

        jwt.sign(
          { id: user._id.toString() },
          key,
          { expiresIn: "1h" },
          (err, token) => {
            if (err)
              return res
                .status(400)
                .json({
                  type: "keygenFailed",
                  message: "key generation failed",
                })
                .end();
            const userData = {
              name: user.userName,
              email: user.email,
              phone: user.phone,
              admin: user.admin,
            };
            currSession.user = user._id;
            currSession.save();
            res.set({ Authorize: token }).status(200).json(userData).end();
          }
        );
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err).end();
    });
};

const logout = (req, res) => {
  const { sessionid: sessionId } = req.headers;

  if (!sessionId)
    return res.status(400).json({
      type: "incompleteData",
      message: "necessary data is missing",
    });

  Session.findById(sessionId)
    .then((session) => {
      session.encryptionKey = undefined;
      session.authKey = undefined;
      session.authToken = undefined;
      session.otpValidated = false;
      session.otp = undefined;
      session.otpCount = 0;
      session.submitCount = 0;
      session.loggedIn = false;
      session.user = undefined;
      return session.save();
    })
    .then((session) => {
      console.log(session);
      res
        .status(200)
        .json({
          status: "success",
        })
        .end();
    })
    .catch((err) => {
      console.log(err);
    });
};

const resetPassword = (req, res) => {
  const { sessionid: sessionId } = req.headers;
  const { password } = req.body;

  Session.findById(sessionId)
    .then((session) => {
      if (!session) return Promise.reject({ type: "invalidSession" });
      if (!session.otpValidated || !session.user || !session.encryptionKey)
        return Promise.reject({ type: "invalidRequest" });

      const decryptedPassword = cryptoJs.AES.decrypt(
        password,
        session.encryptionKey
      ).toString(cryptoJs.enc.Utf8);

      bcrypt
        .hash(decryptedPassword, 12)
        .then((hashedPassword) => {
          return Promise.all([
            User.findByIdAndUpdate(session.user, { password: hashedPassword }),
            session.updateOne({
              otpValidated: false,
              encryptionKey: undefined,
              user: undefined,
            }),
          ]);
        })
        .then((values) => {
          res
            .status(200)
            .json({
              status: "success",
            })
            .end();
        })
        .catch((err) => {
          console.log(err);
          res
            .status(400)
            .json({
              status: "failure",
            })
            .end();
        });
    })
    .catch((err) => {
      res.status(400).json(err).end();
    });
};

module.exports = { register, login, logout, resetPassword };
