const TADirectorySchema = require("../model/TADirectory");
const getCookie = require("../utils/cookies").getEntriesFromCookie;
const updateUserPoints = require("../utils/addPoints").updateUserPoints;
exports.addTa = async (req, res) => {
  const { name, email, course, officeHours, officeLocation, tutorials } =
    req.body;
  const userEmail = getCookie(req).email;
  console.log(userEmail);
  try {
    await TADirectorySchema.create({
      name,
      email,
      course,
      officeHours,
      officeLocation,
      tutorials,
    });
    updateUserPoints(userEmail, 10);
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
