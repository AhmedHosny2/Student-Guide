const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TADirectorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  officeLocation: {
    type: String,
    required: true,
  },
});
const TaCourseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  officeLocation: {
    type: String,
  },
  courseName: {
    type: String,
    required: true,
  },
  tutorials: {
    type: [String],
  },
  officeHours: {
    type: String,
  },
});

const TaModel = mongoose.model("TADirectory", TADirectorySchema);
const TaCourseModel = mongoose.model("TaCourse", TaCourseSchema);
module.exports = { TaModel, TaCourseModel };
