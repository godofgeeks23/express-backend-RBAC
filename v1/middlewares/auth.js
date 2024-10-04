const User = require("./../models/user");

let auth = (req, res, next) => {
  const token =
    req.headers["authorization"]?.split(" ")[1] || req.headers["authorization"];
  console.log("received bearer token - ", token);
  if(!token) {
    return res.json({
      error: true,
      message: "Authentication information missing",
      auth: false,
    });
  }
  User.findByToken(token, (err, user) => {
    if (err) {
      console.log(err); 
      return res.json({
        error: true,
        message: "Some error occured. Check console for details.",
        auth: false,
      });
    }
    if (!user)
      return res.json({
        error: true,
        message: "Invalid authentication information (token).",
        auth: false,
      });
    req.token = token;
    req.user = user;
    next();
  });
};

const checkRole = (roles) => (req, res, next) => {
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();
};

module.exports = { auth, checkRole };
