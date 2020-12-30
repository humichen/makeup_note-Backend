const mongoose = require('mongoose');

const makeupsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { type: String, required: true },
  time: { type: String, required: true },
  tag_array: { type: Array, required: true },
  qty: { type: String, required: true },
  color_code: { type: String, required: true },
  note: { type: String, required: false },
});

const makeupsModel = mongoose.model("Makeups", makeupsSchema);

module.exports = makeupsModel;