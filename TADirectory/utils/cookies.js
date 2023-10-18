const jwt = require('jsonwebtoken');
const secret = process.env.ACCESS_TOKEN_SECRET;
function getEntriesFromCookie(req) {
  console.log("auth cooki 12 \n\n\n"+req.headers.cookie);
  let authcookie=(decodeURIComponent(req.headers.cookie).split("=")[1])
  console.log("auth cooki 11 \n\n\n"+authcookie);
  // authcookie =JSON.parse(authcookie);
  // authcookie = authcookie.token;
console.log("auth cooki \n\n\nn\n"+authcookie);

  const decoded = jwt.verify(authcookie, secret);
  // The 'decoded' variable now contains the payload data
  console.log(decoded); 
  return decoded;
  }
  exports.getEntriesFromCookie = getEntriesFromCookie; 