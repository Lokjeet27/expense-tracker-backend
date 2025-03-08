const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware to authenticate users using Bearer Token (JWT)
 */
exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data to the request object
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
