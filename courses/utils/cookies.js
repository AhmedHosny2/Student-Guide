const jwt = require('jsonwebtoken');
const secret = process.env.ACCESS_TOKEN_SECRET;
function getEntriesFromCookie(req) {
  const authcookie=req.headers.cookie.split("=")[1].split(";")[0]
console.log(authcookie);

  const decoded = jwt.verify(authcookie, secret);
  // The 'decoded' variable now contains the payload data
  console.log(decoded);
  return decoded;
  }
  exports.getEntriesFromCookie = getEntriesFromCookie; 