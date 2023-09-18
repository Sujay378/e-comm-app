const mongoose = require("mongoose");

const { Schema } = mongoose;

const sessionSchema = new Schema({
  authToken: String,
  authKey: String,
  encryptionKey: String,
  otp: String,
  loggedIn: { type: Boolean, default: false },
  otpCount: { type: Number, default: 0 },
  submitCount: { type: Number, default: 0 },
  otpValidated: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Session", sessionSchema);
