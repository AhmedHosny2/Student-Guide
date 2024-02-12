const { TaModel } = require("../model/TADirectory");
const { TaCourseModel } = require("../model/TADirectory");
let TAs = [];
let TACourses = [];
function printMessage() {
  console.log(TACourses);
}
setInterval(printMessage, 15000); // 15000 milliseconds = 15 seconds

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
  const { name, email, officeLocation } = req.body;
  const uniEmail = email + "@giu-uni.de";

  const found = await TaModel.find({ email: uniEmail });
  if (found !== null && found.length > 0) {
    return res.status(200).json({ message: "TAs already exists" });
  }

  try {
    const newTA = await TaModel.create({
      name,
      email: uniEmail,
      officeLocation,
    });
    TAs.push(newTA);
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
  const { email, tutorials, courseName, officeHours } = req.body;
  let found = await TaModel.find({ email: email });
  if (found === null || found.length === 0) {
    return res.status(404).json({ message: "TAs not found" });
  }
  found = found[0];
  try {
    console.log(found);

    const newTAAssign = await TaCourseModel.create({
      name: found.name,
      officeLocation: found.officeLocation,
      email,
      tutorials,
      courseName,
      officeHours,
    });
    TACourses.push(newTAAssign);
    res.status(200).json({ message: "TAs assigned" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteTaCourse = async (req, res) => {
  const { _id } = req.body;
  console.log(req.body);
  try {
    await TaCourseModel.deleteOne({ _id });
    const indexToDelete = TACourses.findIndex(
      (myTA) => myTA._id.valueOf() === _id
    );
    console.log(indexToDelete);
    if (indexToDelete !== -1) {
      TACourses.splice(indexToDelete, 1);
    }
    console.log(TACourses);
    res.status(200).json({ message: "TAs course deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteTa = async (req, res) => {
  const { email } = req.body;
  try {
    await TaModel.deleteOne({ email });
    const indexToDelete = TA.findIndex((myTA) => myTA.email === email);
    if (indexToDelete !== -1) {
      TA.splice(indexToDelete, 1);
    }
    res.status(200).json({ message: "TAs deleted" });
    await TaCourseModel.deleteMany({
      email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
