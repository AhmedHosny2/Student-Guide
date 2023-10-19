const jwt = require("jsonwebtoken");
const axios = require("axios"); // For making HTTP requests
const { USER_BASE_URL } = require("../services/BaseURLs");
const getCookie = require("../utils/cookies").getEntriesFromCookie;
const config = process.env;
module.exports.verifyToken = (req, res, next) => {
  const authcookie = getCookie(req).email;
  console.log("token verfied");
  console.log("the cookieee "+ getCookie(req));
  if (!authcookie) {
    return res.status(403).send("A token is required for authentication");
  }
  return next();
};
module.exports.verifyRole = async (req, res, next) => {
  const authcookie = getCookie(req);
  console.log(authcookie);
  if (!authcookie) {
    return res.status(403).send("A token is required for authentication");
  }
  if (!authcookie.isAdmin) {
    return res.status(401).send("Invalid Token you are not admin");
  }
  console.log("role verfied");
  next();
};
module.exports.testVerifyToken = (req, res, next) => {
  console.log(" you made it to the protected route");
  res.send("You made it to the route.");
  next();
};

module.exports.testVerifyRole = (req, res, next) => {
  console.log(" you made it to the admin route");
  res.send("You made it to the route.");
  next();
};
