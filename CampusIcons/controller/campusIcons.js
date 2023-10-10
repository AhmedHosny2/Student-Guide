const CampusIconsSchema = require("../model/CampusIcons");
exports.addCampusIcon = async (req, res) => {
  const { name, images, description, location } = req.body;
  const isCreated = await CampusIconsSchema.findOne({ name });
  if (isCreated)
    return res.status(400).json({ message: "Campus Icon already exist" });
  try {
    await CampusIconsSchema.create({
      name,
      images,
      description,
      location,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
  res.status(200).json({ message: "Campus Icon created" });
};
exports.updateCampusIcon = async (req, res) => {
  const updatedFields = req.body;
  const { name } = req.params;
  try {
    const isAvailable = await CampusIconsSchema.findOne({ name });

    if (!isAvailable) {
      return res.status(404).json({ message: "University not found" });
    }
   const updatedIcon=  await CampusIconsSchema.updateOne({ name }, updatedFields);
    return res.json({
      message: "University updated successfully",
      
    });
  } catch (error) {
    console.error("Error updating university:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getAllCampusIcons = async (req, res) => {
  try {
    const campusIcons = await CampusIconsSchema.find();
    res.status(200).json({ campusIcons });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getCampusIcon = async (req, res) => {
  const { name } = req.params;
  try {
    const campusIcon = await CampusIconsSchema.findOne({ name });
    if (!campusIcon)
      return res.status(404).json({ message: "Campus Icon not found" });
    res.status(200).json({ campusIcon });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
