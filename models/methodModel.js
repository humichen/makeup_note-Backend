const mongoose = require('mongoose');

const methodsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  website: { type: String, required: true },
  tag_array: { type: Array, required: true },
});

const methodsModel = mongoose.model("Methods", methodsSchema);

module.exports = methodsModel;