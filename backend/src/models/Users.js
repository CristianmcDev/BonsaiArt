const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true,
    unique: true,// unica
  },
  dni: String,
  email: String,
  address: {
    address: String,
    city: String,
    province: String,
    cp: String
  },
  mobile: String,
  tel: String,
  user_pass: {
    type: String,
    required: true,
  }
});

module.exports = model("user", userSchema);
