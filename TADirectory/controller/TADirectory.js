const { TaModel } = require("../model/TADirectory");
const { TaCourseModel } = require("../model/TADirectory");
let TAs = [];
let TACourses = [];

exports.getAllTas = async (req, res) => {
  try {
    if (TAs.length > 0) {
      return res.status(200).json(TAs);
    }
    const tas = await TaModel.find().lean();
    TAs = tas;
    return res.status(200).json(tas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.addTa = async (req, res) => {
  let { name, email, officeLocation, gender } = req.body;
  name = name.toString();
  email = email.toString();
  officeLocation = officeLocation.toString();
  gender = gender.toString();

  const uniEmail = email + "@giu-uni.de";

  const found = await TaModel.find({ email: uniEmail });
  if (found !== null && found.length > 0) {
    return res.status(200).json({ message: "TAs already exists" });
  }

  try {
     await TaModel.create({
      name,
      email: uniEmail,
      officeLocation,
      gender,
    });
    TAs = [];
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
  res.status(200).json({ message: "TAs created" });
};

exports.getTaCourses = async (req, res) => {
  try {
    if (TACourses.length > 0) {
      return res.status(200).json(TACourses);
    }
    const tas = await TaCourseModel.find().lean();
    TACourses = tas;
    res.status(200).json(tas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.assignTa = async (req, res) => {
  // TODO  get all tuts already exist for this course and compare with the new ones
  let { email, tutorials, courseName, officeHours } = req.body;
  email = email.toString();
  tutorials = tutorials.toString();
  courseName = courseName.toString();
  officeHours = officeHours.toString();

  let found = await TaModel.find({ email: email });
  if (found === null || found.length === 0) {
    return res.status(404).json({ message: "TAs not found" });
  }
  found = found[0];
  try {
    console.log(found);

     await TaCourseModel.create({
      name: found.name,
      officeLocation: found.officeLocation,
      gender: found.gender,
      email,
      tutorials,
      courseName,
      officeHours,
    });
    TACourses = [];
    res.status(200).json({ message: "TAs assigned" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteTaCourse = async (req, res) => {
  let { _id } = req.body;
  _id = _id.toString();

  try {
    await TaCourseModel.deleteOne({ _id });
    TACourses = [];

    console.log(TACourses);
    res.status(200).json({ message: "TAs course deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteTa = async (req, res) => {
  let { email } = req.body;
  email = email.toString();

  try {
    await TaModel.deleteOne({ email });
    TAs = [];
    res.status(200).json({ message: "TAs deleted" });
    await TaCourseModel.deleteMany({
      email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
