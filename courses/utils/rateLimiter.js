const { rateLimit } = require("express-rate-limit");
// Rate limiter middleware
exports.limiter = rateLimit({
  windowMs: 10*60 * 1000, // 10 minutes
  max: 100, // maximum number of requests allowed in the windowMs
  handler: (req, res) => {
    res.status(429).send("Too many requests. Please try again later.");
  },
});
