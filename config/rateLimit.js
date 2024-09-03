const rateLimit = require('express-rate-limit');

// Function to create a rate limiter with specified options
function createRateLimiter() {
  return rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes window
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
}

module.exports = createRateLimiter;
