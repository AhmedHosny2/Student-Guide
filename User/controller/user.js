const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')

const userModel = require("../model/user");
const saltRounds = 10;
exports.signupUser = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
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
    const newUser = await userModel.create({
      firstName,
      lastName,
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      semester,
      github,
      linkedin,
      whatsapp,
    });
    // Create token
    const token = jwt.sign(
      { user_id: newUser._id, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "2h",
      }
    );
    newUser.token = token;
    console.log("sign up done");
    res.status(200).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.loginUser = async (req, res) => {
  // authenticate user
  const { email, password } = req.body;
  try {
    if (!(email && password)) {
      return res.status(400).json({ message: "All input is required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;
    res.cookie('authcookie',token,{maxAge:900000,httpOnly:true,secure:true,sameSite:'none'}) 
    // Set the cookie with your data
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
