const jwt = require('jsonwebtoken');
const secret = process.env.ACCESS_TOKEN_SECRET;
function getEntriesFromCookie(req) {
  let authcookie=(decodeURIComponent(req.headers.cookie).split("=")[1].split(";")[0])
  authcookie =JSON.parse(authcookie);
  authcookie = authcookie.token;
console.log("auth cooki \n\n\nn\n"+authcookie);

  const decoded = jwt.verify(authcookie, secret);
  // The 'decoded' variable now contains the payload data
  console.log(decoded); 
  return decoded;
  }
  exports.getEntriesFromCookie = getEntriesFromCookie; 