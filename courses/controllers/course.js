const courseModel = require("../model/courseModel");
exports.addCourse = async (req, res) => {
  const { courseName, content, courseCode, courseCredits, semester } = req.body;
  const email = req.user.email;
  console.log("the user \n\n");
  console.log(email);
  const isCreted = await courseModel.findOne({ courseName });
  if (isCreted) {
    return res.status(400).json({ message: "course already exist" });
  }
  try {
    const course = await courseModel.create({
      courseName,
      content,
      courseCode,
      courseCredits,
      semester,
      contributors: [email],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
  res.status(200).json({ message: "course created" });
};

exports.getCourse = async (req, res) => {
  const { courseName } = req.params;
  console.log(courseName);
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
