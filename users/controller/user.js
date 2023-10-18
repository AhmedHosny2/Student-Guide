const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../model/user");
const saltRounds = 10;

// Refresh token function
function refreshToken(user, expiresAt) {
  const { user_id, email, isAdmin } = user;
  return jwt.sign({ user_id, email, isAdmin }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: expiresAt,
  });
}

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
      { user_id: user._id, email, isAdmin: user.isAdmin },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "2h",
      }
    );

    // Calculate the new time after adding 5 hours
    const fiveHoursInMilliseconds = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
    const newTime = new Date(Date.now() + fiveHoursInMilliseconds);

    const domains = [".ahmed-yehia.me", "localhost"];

    // Set cookies for each domain
    domains.forEach((domain) => {
      const refreshToken = refreshToken(user, newTime);
      res.cookie("authcookie", token, {
        expires: newTime,
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: domain,
        path: "/",
      });
      res.cookie("refreshToken", refreshToken, {
        expires: newTime,
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: domain,
        path: "/",
      });
    });

    console.log("logged in ");
    res.status(200).send("login successful");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  const user_email = req.params.userEmail;
  console.log(req.params);
  const user = await userModel.findOne({ email: user_email });
  if (!user) {
    return res.status(400).json({ message: "user does not exist" });
  }
  console.log(user);
  res.status(200).json(user);
};

exports.logoutUser = async (req, res) => {
  console.log("logged out");
  res.clearCookie("authcookie");
  res.clearCookie("refreshToken"); // Clear both the access and refresh tokens
  res.json({ message: "Logout successful" });
};

exports.updateUserPoints = async (req, res) => {
  const { userEmail, points } = req.body;
  userModel.findOneAndUpdate(
    { email: userEmail },
    { contributionPoints: points },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      console.log(doc);
    }
  );
  res.status(200).json({ message: "user updated" });
};
