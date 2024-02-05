const { TaModel } = require("../model/TADirectory");
const getCookie = require("../utils/cookies").getEntriesFromCookie;
const updateUserPoints = require("../utils/addPoints").updateUserPoints;
const { TaCourseModel } = require("../model/TADirectory");
exports.addTa = async (req, res) => {
  const { name, email, officeLocation } = req.body;
  const userEmail = getCookie(req).email;
  const uniEmail = email + "@giu-uni.de";
  console.log(uniEmail);
  const found = await TaModel.find({ email: uniEmail });
  if (found !== null && found.length > 0) {
    return res.status(200).json({ message: "TA already exists" });
  }

  try {
    await TaModel.create({
      name,
      email: uniEmail,
      officeLocation,
    });
    // updateUserPoints(userEmail, 10);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
  res.status(200).json({ message: "TA created" });
};

exports.getAllTas = async (req, res) => {
  try {
    const tas = await TaModel.find();
    res.status(200).json(tas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.assignTa = async (req, res) => {
  // TODO  get all tuts already exist for this course and compare with the new ones
  const { email, tutorials, courseName, officeHours } = req.body;
  // const userEmail = getCookie(req).email;
  const uniEmail = email + "@giu-uni.de";
  const found = TaModel.find({ email: uniEmail });
  console.log(found);
  if (!found) {
    return res.status(404).json({ message: "TA not found" });
  }
  try {
    await TaCourseModel.create({
      name: found.name,
      officeLocation: found.officeLocation,
      email,
      tutorials,
      courseName,
      officeHours,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
