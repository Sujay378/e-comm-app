const express = require("express");
const bodyParder = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const http = require("http");

const { getEnvPath } = require("./helpers/getFilePath");

require("dotenv").config({ path: getEnvPath() });

const contentRoutes = require("./routes/contentRoutes");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const encryptionRoutes = require("./routes/encryptionRoutes");
const otpRoutes = require("./routes/otpRoutes");

const app = express();

app.use(cors());
app.use(bodyParder.urlencoded({ extended: false }));
app.use(bodyParder.json());

app.use((req, res, next) => {
  if (req.headers.sessionid) {
    res.setHeader("sessionid", req.headers.sessionid);
  }
  next();
});

app.use("/content", contentRoutes);

app.use("/auth", authRoutes);

app.use("/session", sessionRoutes);

app.use("/encryption", encryptionRoutes);

app.use("/otp", otpRoutes);

app.use("**", (req, res) => {
  res
    .status(500)
    .json({
      type: "serviceUnavailable",
      message: "Fatal Service not found",
    })
    .end();
});

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then((client) => {
    console.log("DB Connected");
    server.listen(process.env.NODE_PORT, () =>
      console.log(`http://localhost:${process.env.NODE_PORT}/`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
