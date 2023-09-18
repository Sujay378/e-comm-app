const mongoose = require('mongoose');
const { Schema, model, SchemaTypes } = mongoose;

const contentSchema = new Schema({
  copyId: { type: String, required: true },
  text: { type: String, required: true},
  jcard: { type: String, required: true }
});

module.exports = model('Content', contentSchema);
