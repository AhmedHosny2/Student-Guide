const bcrypt = require("bcrypt");
const userModel = require("../model/user");

const saltRounds = 10;
exports.signupUser = async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    semester,
    github,
    linkedin,
    whatsapp,
  } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new userModel({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
      semester,
      github,
      linkedin,
      whatsapp,
    });
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


