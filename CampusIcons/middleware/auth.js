const jwt = require("jsonwebtoken");
const axios = require("axios"); // For making HTTP requests
const { USER_BASE_URL } = require("../services/BaseURLs");
const config = process.env;
module.exports.verifyToken = (req, res, next) => {
  const authcookie = req.cookies.authcookie;
  console.log(req.cookies);
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
module.exports.verifyRole = async (req, res, next) => {
  const authcookie = req.cookies.authcookie;
  if (!authcookie) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(authcookie, config.ACCESS_TOKEN_SECRET);
    const user_id = decoded.user_id;
    let user = {};
    const authCookie = req.cookies.authcookie;
    const url = `${USER_BASE_URL}/${user_id}`;
    console.log("auth cookie is : ", authCookie);
    // Configure Axios to include the cookie in the request headers
    const axiosConfig = {
      headers: {
        Cookie: `authcookie=${authCookie}`, // Include the cookie in the 'Cookie' header
      },
    };

    // Make the GET request with the Axios configuration
    axios
      .get(url, axiosConfig)
      .then((response) => {
        // Handle the response her
        // console.log("response is : ", response.data);
        user = response.data;
        console.log("user \n\n\n");
        console.log(user);
        if (user.isAdmin) {
          console.log("yeah ya admin  \n\n\n\n\n\n");
          return next();
        } else {
          return res.status(401).send("Invalid Token you are not admin");
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  } catch (err) {
    // console.log(err);
    return res.status(401).send("Invalid Token");
  }
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
