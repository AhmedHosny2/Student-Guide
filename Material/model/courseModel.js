const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  courseName: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
  },

  courseCode: {
    type: String,
  },
  courseCredits: {
    type: Integer,
  },
  semester: {
    type: Integer,
  },
  contributors: {
    type: Array,
  },
});
module.exports = mongoose.model("material", materialSchema);
