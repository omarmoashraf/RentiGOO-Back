// auth 
const checkLogin = (req, res, next) => {
  const token = req.header("Authorization" 
    || "authorization")?.split(" ")[1]; 
  if (!token) {
     return res.status(400).json({
       message: "not allowed",
        data: null,
       });
       } 
       next();
       };
module.exports=checkLogin;