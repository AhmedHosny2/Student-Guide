const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CampusIconsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
});
module.exports = mongoose.model("CampusIcons", CampusIconsSchema);
