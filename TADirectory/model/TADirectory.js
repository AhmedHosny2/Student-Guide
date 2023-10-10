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
  course: {
    type: String,
    required: true,
  },
  officeHours: {
    type: String,
  },
  officeLocation: {
    type: String,
  },
  tutorials: {
    type: Array,
  },
});
module.exports = mongoose.model("TADirectory", TADirectorySchema);
