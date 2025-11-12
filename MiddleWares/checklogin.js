// auth 
const checkLogin = (req, res, next) => {
  const token = (req.header("Authorization") || req.header("authorization"))?.split(" ")[1]; 
const role = req.header("role");
  if (!token) {
    return res.status(400).json({
      message: "not allowed",
      data: null,
    });
  } 
req.user = { token, role };
  next();
};

module.exports = checkLogin;
