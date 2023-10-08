const jwt = require("jsonwebtoken");
const config = process.env;
module.exports.verifyToken = (req, res, next) => {
  const authcookie = req.cookies.authcookie
  if (!authcookie) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(authcookie, config.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    console.log(decoded);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

