const { Schema, model } = require("mongoose");

const adminschema = new Schema({
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true,
    unique: true,// unica
  },
  user_pass: {
    type: String,
    required: true,
  }
});

module.exports = model("admin", adminschema);
