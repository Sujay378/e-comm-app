const Content = require("../models/content");
const Session = require("../models/session");

const addOneContent = (req, res) => {
  const { id: copyId, text, jcard } = req.body;
  const { sessionid } = req.headers;

  if (!copyId || !text || !jcard || !sessionid)
    return res.status(200).json({ type: "incompleteData" }).end();

  Session.findById(sessionid)
    .populate("user", "admin")
    .then((session) => {
      console.log(session);
      if (!session) return Promise.reject({ type: "invalidSession" });
      if (!session.user) return Promise.reject({ type: "invalidUser" });
      if (!session.user.admin) return Promise.reject({ type: "accessDenied" });

      Content.create({ copyId, text, jcard })
        .then((content) => {
          res.status(200).json({ status: "success" }).end();
        })
        .catch((err) => {
          res.status(200).json({ status: "failure" }).end();
        });
    })
    .catch((err) => {
      res.status(400).json(err).end();
    });
};
