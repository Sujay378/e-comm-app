const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
  cart: { type: [{ item: String, quantity: Number }], default: [] }
});

module.exports = mongoose.model('User', userSchema);
