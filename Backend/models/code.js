const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Code", codeSchema);
