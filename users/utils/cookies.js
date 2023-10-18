const jwt = require('jsonwebtoken');
const secret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

function getEntriesFromCookie(req) {
  const authCookie = req.headers.cookie.split("=")[1].split(";")[0];
  const refreshTokenCookie = req.headers.cookie.split("refreshToken=")[1].split(";")[0];

  try {
    // Verify the access token
    const decodedAccessToken = jwt.verify(authCookie, secret);

    // If the access token is valid, return its payload
    console.log("Access token payload:", decodedAccessToken);
    return decodedAccessToken;
  } catch (accessError) {
    // Access token has expired or is invalid, let's try to use the refresh token
    try {
      // Verify the refresh token
      const decodedRefreshToken = jwt.verify(refreshTokenCookie, refreshSecret);

      // Generate a new access token with the same payload data
      const newAccessToken = jwt.sign(decodedRefreshToken, secret, {
        expiresIn: "2h", // Set the expiration time for the new access token
      });

      console.log("New access token:", newAccessToken);
      return newAccessToken;
    } catch (refreshError) {
      // Both access and refresh tokens are invalid, handle the error
      console.error("Token verification error:", refreshError);
      return null; // Return null or handle the error as needed
    }
  }
}

exports.getEntriesFromCookie = getEntriesFromCookie;
