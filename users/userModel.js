let mongoose = require("mongoose");
let { isEmail } = require("validator");
const schema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    validate: [isEmail, "invalid email"],
    unique: true,
    lowercase: true,
    required: true,
  },
  password: { type: String, minLength: 6, required: true },
});

const model = mongoose.model("UserModal", schema);

module.exports = model;
