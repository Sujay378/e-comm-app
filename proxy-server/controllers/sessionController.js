const Session = require("../models/session");

const generate = (req, res) => {
  Session.create({})
    .then((session) => {
      if (session) {
        res.status(200).json({ id: session._id.toString() }).end();
      } else throw "session generation failed";
    })
    .catch((err) => {
      res
        .status(400)
        .json({
          type: "dbError",
          message: "session genration failed",
        })
        .end();
    });
};

const endSession = (req, res) => {
  const { sessionid } = req.headers;
  Session.findById(sessionid)
    .then((session) => {
      return session.deleteOne();
    })
    .then(() => {
      res.status(200).json({ message: "Session ended" }).end();
    })
    .catch((err) => {
      res.status(400).json({
        type: "sessionNotFound",
        message: "session not found in db collection",
      });
    });
};

module.exports = { generate, endSession };
