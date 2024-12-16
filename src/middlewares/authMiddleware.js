const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token from header

  if (!token) {
    return res.status(403).json({ message: "Access denied, token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Attach userId to request
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = validateToken;
