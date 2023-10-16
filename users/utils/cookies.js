const jwt = require('jsonwebtoken');
const secret = process.env.ACCESS_TOKEN_SECRET;

function getEntriesFromCookie(req) {
  const decoded = jwt.verify(req.headers.cookie.split("=")[1], secret);
  // The 'decoded' variable now contains the payload data
  console.log(decoded);
  return decoded;
  }
  exports.getEntriesFromCookie = getEntriesFromCookie;