const axios = require("axios");
const courseModel = require("../model/courseModel");
const getCookie = require("../utils/cookies").getEntriesFromCookie;
const userURL = require("../services/BaseURLs").USER_BASE_URL;
const updateUserPoints = require("../utils/addPoints").updateUserPoints;
const redis = require("redis");
const client = redis.createClient();
const DEFAULT_EXPIRATION = 600;
const runRedis = async () => {
  await client.connect();
};
runRedis();

exports.addCourse = async (req, res) => {
  const { courseName, courseCode, courseCredits, semester, content } = req.body;

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
  const { courseName } = req.params;
  try {
    let course = await client.get(courseName);
    if (!course || course.length === 0) {
      console.log("course not found in cache");
      course = await courseModel.findOne({ courseName });
      client.setEx(courseName, DEFAULT_EXPIRATION, JSON.stringify(course));
    } else course = JSON.parse(course);
    if (!course)
      return res.status(400).json({ message: "course does not exist" });

    res.status(200).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateCourse = async (req, res) => {
  const { courseName } = req.params;
  const { content } = req.body;
  try {
    const course = await courseModel.findOne({ courseName });
    if (!course) {
      return res.status(400).json({ message: "course does not exist" });
    }
    const newCourse = await courseModel.findOneAndUpdate(
      { courseName },
      { content }
    );

    await newCourse.save();
    return res.status(200).json({ message: "course updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
