const TADirectorySchema = require("../model/TADirectory");
const getCookie = require("../utils/cookies").getEntriesFromCookie;

exports.addTa = async (req, res) => {
  const { name, email, course, officeHours, officeLocation, tutorials } =
    req.body;
  const email22 = getCookie(req).email;
  console.log(email22);
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

exports.getAllTas = async (req, res) => {
  try {
    const tas = await TADirectorySchema.find();
    res.status(200).json(tas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
