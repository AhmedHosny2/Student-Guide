const { rateLimit } = require("express-rate-limit");
// Rate limiter middleware
exports.limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // maximum number of requests allowed in the windowMs
  handler: (req, res) => {
    res.status(429).send("Too many requests. Please try again later.");
  },
});
