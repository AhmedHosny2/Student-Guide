const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  contributionPoints: {
    type: Number,
    default: 0,
  },
  semester: {
    type: Number,
    required: true,
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  whatsapp: {
    type: Number,
  },
});
module.exports = mongoose.model("User", userSchema);
