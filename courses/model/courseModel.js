const mongoose = require("mongoose");
const { Schema } = mongoose;
const courseSchema = new Schema({
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
    type: Number,
  },
  semester: {
    type: Number,
  },
  contributors: {
    type: Array,
  },
});
module.exports = mongoose.model("course", courseSchema);
