const TADirectorySchema = require("../model/TADirectory");

exports.addTa = async (req, res) => {
  const { name, email, course, officeHours, officeLocation, tutorials } =
    req.body;
  const isCreated = await TADirectorySchema.findOne({ email, course });
  if (isCreated) return res.status(400).json({ message: "TA already exist" });
  try {
    await TADirectorySchema.create({
      name,
      email,
      course,
      officeHours,
      officeLocation,
      tutorials,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
  res.status(200).json({ message: "TA created" });
};
exports.getTa = async (req, res) => {
  const { email } = req.params;
  const isAvilabale = TADirectorySchema.findOne({ email });
  if (!isAvilabale)
    return res.status(400).json({ message: "TA does not exist" });
  try {
    const TA = await TADirectorySchema.find({ email });
    console.log(TA);
    res.status(200).json(TA);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllTas = async (req, res) => {
  try {
    const tas = await TADirectorySchema.find();
    res.status(200).json(tas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
