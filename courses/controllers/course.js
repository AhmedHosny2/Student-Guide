const axios = require("axios");
const courseModel = require("../model/courseModel");
const getCookie = require("../utils/cookies").getEntriesFromCookie;
const userURL = require("../services/BaseURLs").USER_BASE_URL;
exports.addCourse = async (req, res) => {
  const { courseName,  courseCode, courseCredits, semester } = req.body;

  const email = getCookie(req).email;
  console.log(email);
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
      contributors: [email],
    });
    updateUserPoints(email);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
  res.status(200).json({ message: "course created" });
};

exports.getCourse = async (req, res) => {
  const { courseName } = req.params;
  try {
    const course = await courseModel.findOne({ courseName });
    console.log(course);
    if (!course) {
      return res.status(400).json({ message: "course does not exist" });
    }
    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateCourse = async (req, res) => {
  const { courseName } = req.params;
  const { content } = req.body;
  console.log(courseName);
  try {
    const course = await courseModel.findOne({ courseName });
    console.log(course);
    if (!course) {
      return res.status(400).json({ message: "course does not exist" });
    }
    const newCourse = await courseModel.findOneAndUpdate(
      { courseName },
      { content }
    );
    return res.status(200).json({ message: "course updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to update user points in the Course microservice
async function updateUserPoints(userEmail) {
  try {
    const response = await axios.put(`${userURL}/updatePoints`, {
      userEmail,
      points: 10,
    });

    console.log(response.data);
  } catch (error) {
    console.error("Error updating user points:", error.message);
  }
}
