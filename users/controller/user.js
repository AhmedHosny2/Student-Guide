const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user");
const crypto = require("crypto");
const getCookies = require("../utils/cookies").getEntriesFromCookie;
const saltRounds = 10;
const domain = process.env.DOMAIN;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const {} = require("../utils/emailTemp");
const sendEmail = async (to, subject, text) => {
  const msg = {
    to,
    from: "the.guide.student@gmail.com", // Change to your verified sender
    subject,
    text,
    html: `<strong>${text}</strong>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

function generateOTP() {
  // Generate a random 6-digit number
  const otp = crypto.randomInt(100000, 999999);
  return otp;
}

// Refresh token function
const generateRefreshToken = (user, expiresAt, isrefresh) => {
  console.log(user);
  const { email, isAdmin } = user;
  return jwt.sign(
    { email, isAdmin },
    isrefresh
      ? process.env.REFRESH_TOKEN_SECRET
      : process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: expiresAt,
    }
  );
};

exports.signupUser = async (req, res) => {
  let { userName, email, password, semester } = req.body;

  userName = userName.toString();
  email = email.toString();
  password = password.toString();
  semester = semester.toString();

  try {
    userName = userName.toLowerCase();
    email = email.toLowerCase();
    console.log(email.slice(-19));
    const checkEmail = await userModel.findOne({ email });
    const checkuserName = await userModel.findOne({ userName });
    // check if the email is a GIU email by checking last 10 characters
    if (
      email.slice(-19) !== "@student.giu-uni.de" &&
      email.slice(-11) !== "@giu-uni.de"
    ) {
      return res.status(401).json({ message: "Email should be a GIU email" });
    }
    if (checkEmail || checkuserName) {
      return res
        .status(402)
        .json({ message: "Choose another User name or Email" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await userModel.create({
      userName,
      email: email,
      password: hashedPassword,
      semester,
    });
    const randomOTP = generateOTP();

    user.OTP = randomOTP;
    await user.save();
    // send welcome email
    sendEmail(email, "Welcome  mail and OTP", signUpEmailTemp(randomOTP));
    console.log("Sign up done");
    res.status(200).json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  let { userName, password } = req.body;
  userName = userName.toLowerCase();
  userName = userName.toString();
  password = password.toString();
  try {
    if (!(userName && password)) {
      return res.status(400).json({ message: "All input is required" });
    }

    const user = await userModel.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "userName does not exist" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    if (!user.verifyed) {
      return res.status(207).json({
        message: "Email is not verified",
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
    // Calculate the new time after adding 5 hours
    const fiveHoursInMilliseconds = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
    const newTime = new Date(Date.now() + fiveHoursInMilliseconds);

    // const domains = [".ahmed-yehia.me", "localhost"];
    // const domain = ".ahmed-yehia.me";
    const newTimeRefresh = new Date(Date.now() + 1000 * 60 * 60 * 24 * 399);

    // Set cookies for each domain
    const refreshToken = generateRefreshToken(user, "1825d", true);
    const token = generateRefreshToken(user, "1", false);

    res.cookie("authcookie", token, {
      expires: newTime,
      httpOnly: true,
      sameSite: "none",
      secure: true,
      domain,
      path: "/",
    });
    console.log(refreshToken);
    res.cookie("refreshToken", refreshToken, {
      expires: newTimeRefresh,
      httpOnly: true,
      sameSite: "none",
      secure: true,
      domain,
      path: "/",
    });

    console.log("Logged in");
    return res.status(202).json({
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
      // token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  let email = getCookies(req).email;
  email = email.toLowerCase();
  email = email.toString();
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  console.log(user);
  res.status(200).json({
    email: user.email,
    userName: user.userName,
    isAdmin: user.isAdmin,
  });
};

exports.logoutUser = async (req, res) => {
  console.log("Logged out");
  res.clearCookie("authcookie");
  res.clearCookie("refreshToken"); // Clear both the access and refresh tokens
  res.json({ message: "Logout successful" });
};

exports.updateUserPoints = async (req, res) => {
  let { userEmail, points } = req.body;
  userEmail = userEmail.toString();
  points = parseInt(points);
  const curUser = await userModel.findOne({ email: userEmail });
  const newPoints = curUser.contributionPoints + points;
  console.log(newPoints);
  const updatedUser = await userModel.findOneAndUpdate(
    { email: userEmail },
    { contributionPoints: newPoints }
  );
  console.log(updatedUser);
  res.status(200).json({ message: "User updated" });
};

exports.sendOTP = async (req, res) => {
  let email = req.body.userEmail;
  email = email.toLowerCase();
  email = email.toString();
  const user = await userModel.findOne({ email });
  let randomOTP;
  if (user.OTP) {
    user.OTPTiral += 1;
    randomOTP = user.OTP;
    await user.save();
  }
  if (user.OTPTiral > 2) {
    res
      .status(400)
      .json({ message: "You have reached the maximum number of OTP trials" });
    return;
  }
  if (!randomOTP) randomOTP = generateOTP();
  await sendEmail(
    email,
    "OTP for email verification",
    `Your OTP is ${randomOTP}`
  );
  user.OTP = randomOTP;
  await user.save();
  res.status(200).json({ message: "OTP sent" });
};
exports.verifyOTP = async (req, res) => {
  let { OTP } = req.body;
  let email = req.body.userEmail.toString();
  OTP = OTP.toString();

  const user = await userModel.findOne({ email });
  if (user.OTP === OTP) {
    user.verifyed = true;
    await user.save();
    res.status(200).json({ message: "Email verified" });
  } else {
    res.status(400).json({ message: "OTP is incorrect" });
  }
};
// resend otp for all unverified emails
const resendOTP = async () => {
  const users = await userModel.find({ verifyed: false });
  for (let user of users) {
    let randomOTP = generateOTP();
    await sendEmail(
      user.email,
      "OTP for email verification",
      `sorry for what happened today here is Your OTP  ${randomOTP}`
    );
    user.OTP = randomOTP;
    await user.save();
  }
};
