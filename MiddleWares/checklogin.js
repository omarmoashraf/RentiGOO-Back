// middlewares/auth.js
const jwt = require("jsonwebtoken");

// Middleware to check login (JWT verification)
const checkLogin = (req, res, next) => {
  const token = (req.header("Authorization") 
  || req.header("authorization"))?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ 
      message: "Data not found.",
       data: null
       });
  }

  try {
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded should include id and role
    next();
  } catch (err) {
    return res.status(400).json({ 
      message: "Invalid token",
       data: null });
  }
};

// Middleware to check user role
const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Unauthorized. Role missing.", data: null });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: "Forbidden. You do not have the required role.", data: null });
    }

    next();
  };
};

// Export both middlewares
module.exports = { checkLogin, checkRole };
