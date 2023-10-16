const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../model/user");
const saltRounds = 10;
exports.signupUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await userModel.create({
      userName,
      email: email.toLowerCase(),
      password: hashedPassword,
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
    console.log("logged in ");
    // save user token
    user.token = token;
    req.session.email = email; // Store the email in the session
    console.log(req.session.email);
    res.cookie("authcookie", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    // Set the cookie with your data
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getUser = async (req, res) => {
  const user_id = req.params.userId;
  console.log(req.params);
  const user = await userModel.findOne({ _id: user_id });
  if (!user) {
    return res.status(400).json({ message: "user does not exist" });
  }
  console.log(user);
  res.status(200).json(user);
};
exports.logoutUser = async (req, res) => {
  res.clearCookie("authcookie");
  res.status(200).json({ message: "logout successful" });
};
