// checkRole.js & ensures the user has the require role
const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        message: "Unauthorized. Role missing.",
        data: null,
      });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        message: "Forbidden. You do not have the required role.",
        data: null,
      });
    }

    next(); // role matches
  };
};

module.exports = checkRole;
