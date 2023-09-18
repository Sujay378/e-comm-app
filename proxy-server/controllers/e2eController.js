const Session = require("../models/session");
const { generateKey } = require("../util");

const generateE2eKey = (req, res) => {
  const { sessionid } = req.headers;
  const key = generateKey();

  Session.findById(sessionid)
    .then((session) => {
      if (!session)
        return Promise.reject({
          type: "invalidSession",
          message: "session not found",
        });

      session.encryptionKey = key;
      return session.save();
    })
    .then((updatedSession) => {
      res
        .status(200)
        .json({ encryptedKey: updatedSession.encryptionKey })
        .end();
    })
    .catch((err) => {
      if (err) return res.status(400).json(err).end();
    });
};

module.exports = { generateE2eKey };
