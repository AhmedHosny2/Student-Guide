const jwt = require("jsonwebtoken");
const getCookie = require("../utils/cookies").getEntriesFromCookie;
module.exports.verifyToken = (req, res, next) => {
  const cookie = getCookie(req);
  console.log(cookie);

  if (!cookie.email) {
    return res.status(403).send("A token is required for authentication");
  }

  return next();
};
module.exports.verifyRole = (req, res, next) => {
  const authcookie = req.cookies.authcookie;
  if (!authcookie) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const cookie = getCookie(req);
    const isAdmin = cookie.isAdmin;

    if (isAdmin) {
      console.log("yeah ya admin  \n\n\n\n\n\n");
      return next();
    } else {
      return res.status(401).send("Invalid Token you are not admin");
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};
// module.exports.testVerifyToken = (req, res, next) => {
//   const userEmail = getCookie(req); // Retrieve the user's email from the cookie
//   console.log(userEmail);
//   console.log(" you made it to the protected route");
//   res.status(200).send("You made it to the route.");
// };

// module.exports.testVerifyRole = (req, res, next) => {
//   console.log(" you made it to the admin route");
//   res.send("You made it to the route.");
//   next();
// };
