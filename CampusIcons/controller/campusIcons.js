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
