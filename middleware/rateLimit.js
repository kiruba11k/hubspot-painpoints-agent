import rateLimit from "express-rate-limit";

export const agentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50
});
