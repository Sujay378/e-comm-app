const nodeMailer = require("nodemailer");

const User = require("../models/user");
const Session = require("../models/session");
const { generateOTP } = require("../util");

const transporter = nodeMailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const mailTemplate = `
<p>Hi [username],</p>
<p>Here is your otp for reseting password</p>
<h3>[otp]</h3>
`;

const mailGenerator = (name, otp) =>
  mailTemplate.replace("[username]", name).replace("[otp]", otp);

const request = (req, res) => {
  const { sessionid: sessionId } = req.headers;
  const { email } = req.body;

  if (!email || !sessionId)
    return res.status(400).json({
      type: "invalidData",
      message: "Incorrect data was passed",
    });

  Session.findById(sessionId)
    .then((session) => {
      if (!session) return Promise.reject({ type: "invalidSession" });
      if (session.otpCount === 3) {
        res
          .status(200)
          .json({
            status: "maxAttempts",
            message: "OTP generation max attempts reached",
          })
          .end();
        return Promise.reject();
      }

      return User.findOne({ email }).then((user) => {
        if (!user) return Promise.reject({ type: "invalidUser" });

        const otp = generateOTP();
        const mail = mailGenerator(user.userName, otp);
        transporter.sendMail({
          from: "[e-comm app] simulate.admin@ecom.com",
          to: user.email,
          subject: "OTP generated",
          html: mail,
        });

        return session.updateOne(
          {
            otp,
            otpCount: session.otpCount + 1,
            user: user._id,
          },
          { runValidators: true }
        );
      });
    })
    .then((session) => {
      const response = {
        status: session.otpCount === 3 ? "lastAttept" : "otpGenerated",
        message: "Otp sent via mail",
      };
      res.status(200).json(response).end();
    })
    .catch((err) => {
      if (err) {
        res
          .status(err.code || 400)
          .json(err)
          .end();
      }
    });
};

const submit = (req, res) => {
  const { sessionid: sessionId } = req.headers;
  const { otpToken } = req.body;

  if (!otpToken || !sessionId)
    return res.status(400).json({
      type: "incompleteData",
      message: "Incorrect data was passed",
    });

  Session.findById(sessionId).then((session) => {
    if (!session) return Promise.reject({ type: "invalidSession" });
    if (!session.otp) return Promise.reject({ type: "invalidRequest" });

    if (session.submitCount < 3) {
      session.submitCount += 1;
      if (session.otp === otpToken) {
        session.submitCount = 0;
        session.otpCount = 0;
        session.otpValidated = true;
        res
          .status(200)
          .json({
            status: "success",
          })
          .end();
      } else {
        if (session.submitCount === 3) {
          session.submitCount = 0;
          session.otpCount = 0;
          session.otpValidated = false;
          res.status(200).json({ status: "maxAttempts" }).end();
        } else {
          session.otpValidated = false;
          res
            .status(200)
            .json({
              status: "invalidOtp",
            })
            .end();
        }
      }
      session.otp = undefined;
    }
    session.save();
  });
};

module.exports = { request, submit };
