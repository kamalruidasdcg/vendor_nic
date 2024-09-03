const rateLimit = require('express-rate-limit');

// Function to create a rate limiter with specified options
function createRateLimiter() {
  const LIMIT_TIME_IN_MS = 1 * 60 * 1000;
  const MAX_REQUEST = 100;
  return rateLimit({
    windowMs: LIMIT_TIME_IN_MS, // LIMIT_TIME_IN_MS(milisecond) minutes window
    max: MAX_REQUEST, // Limit each IP to MAX_REQUEST requests per windowMs
    message: `Too many requests from this IP, please try again after  ${LIMIT_TIME_IN_MS / (60 * 1000)} minutes.`,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
}

module.exports = createRateLimiter;
