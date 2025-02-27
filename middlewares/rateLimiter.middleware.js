
const REQUEST_LIMIT = 10;
const WINDOW_SIZE = 60000;
const rateLimit = {};

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const currentTime = Date.now();

  if (!rateLimit[ip]) {
    rateLimit[ip] = [];
  }

  rateLimit[ip] = rateLimit[ip].filter(timestamp => currentTime - timestamp < WINDOW_SIZE);

  if (rateLimit[ip].length >= REQUEST_LIMIT) {
    return res.status(429).json({ message: 'There Too many requests, please try again later...' });
  }

  rateLimit[ip].push(currentTime);
  next();
};

export default rateLimiter;
