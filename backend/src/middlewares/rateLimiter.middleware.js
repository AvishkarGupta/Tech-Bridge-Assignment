import rateLimit from "express-rate-limit";

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  keyGenerator: (req, res) => req.ip || req.body.email,
  message: {
    status: 429,
    message: "Too many login attempts from this IP, please try again after an hour"
  },
  standardHeaders: true,
  legacyHeaders: false,
});