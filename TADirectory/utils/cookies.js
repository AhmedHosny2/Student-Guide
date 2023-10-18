const jwt = require("jsonwebtoken");
const secret = process.env.ACCESS_TOKEN_SECRET;

exports.getEntriesFromCookie = function (req) {
  console.log("auth cookie 12 \n\n\n" + req.headers.cookie);
  let authcookie = decodeURIComponent(req.headers.cookie).split("=")[1];
  console.log("auth cookie 11 \n\n\n" + authcookie);
  // authcookie =JSON.parse(authcookie);
  // authcookie = authcookie.token;
  console.log("auth cookie \n\n\nn\n" + authcookie);
  try {
    const decoded = jwt.verify(authcookie, secret);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Token has expired, try refreshing it
      try {
        const refreshedToken = refreshToken(token, refreshedToken);
        const decoded = jwt.verify(refreshedToken, secret);
        return decoded;
      } catch (refreshError) {
        // Handle refresh error
        console.error("Refresh token error:", refreshError);
        throw refreshError;
      }
    } else {
      // Handle other token verification errors
      console.error("Token verification error:", error);
      throw error;
    }
  }
};
