const axios = require("axios");
const courseModel = require("../model/courseModel");
const getCookie = require("../utils/cookies").getEntriesFromCookie;
const userURL = require("../services/BaseURLs").USER_BASE_URL;
const updateUserPoints = require("../utils/addPoints").updateUserPoints;
const Courses = new Map();
exports.addCourse = async (req, res) => {
  let { courseName, courseCode, courseCredits, semester, content } = req.body;
  courseName = courseName.toString();
  courseCode = courseCode.toString();
  courseCredits = courseCredits.toString();
  semester = semester.toString();
  content = content.toString();

  const email = getCookie(req).email;
  const isCreted = await courseModel.findOne({ courseName });
  if (isCreted) {
    return res.status(400).json({ message: "course already exist" });
  }
  try {
    await courseModel.create({
      courseName,
      courseCode,
      courseCredits,
      semester,
      content,
      contributors: [email],
    });
    updateUserPoints(email, 30);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
  res.status(200).json({ message: "course created" });
};

exports.getCourse = async (req, res) => {
  let { courseName } = req.params;
  courseName = courseName.toString();
  try {
    if (Courses.get(courseName))
      return res.status(200).json(Courses.get(courseName));

    const course = await courseModel.findOne({ courseName }).lean();
    Courses.set(courseName, course);
    // client.setEx(courseName, DEFAULT_EXPIRATION, JSON.stringify(course));
    // } else course = JSON.parse(course);
    if (!course)
      return res.status(400).json({ message: "course does not exist" });

    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateCourse = async (req, res) => {
  let { courseName } = req.params;
  let { content } = req.body;
  courseName = courseName.toString();
  content = content.toString();
  try {
    const course = await courseModel.findOne({ courseName });
    if (!course) {
      return res.status(400).json({ message: "course does not exist" });
    }
    const newCourse = await courseModel.findOneAndUpdate(
      { courseName },
      { content }
    );
    Courses.delete(courseName);
    await newCourse.save();
    return res.status(200).json({ message: "course updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
