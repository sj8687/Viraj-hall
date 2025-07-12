import rateLimit from 'express-rate-limit';

export const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Too many requests to general route',
   handler: (req, res) => {
    console.log(`Blocked IP: ${req.ip} exceeded limit`);
    res.status(429).json({ message: 'Too many requests to general route' });
  }
});


