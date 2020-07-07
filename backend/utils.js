const jwt = require("jsonwebtoken");
const config = require("./config");

// jwt token
const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
};

// verify user login
const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (error, decode) => {
      if (error) {
        return res.status(401).send({ message: "Invalid Authorization Token" });
      } else {
        req.user = decode;
        next();
        return;
      }
    });
  } else {
    return res
      .status(401)
      .send({ message: "Authorization Token is not supplied" });
  }
};

// verify user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.isAmin) {
    return next();
  } else {
    return res.status(401).send({ message: "Admin Token is not valid" });
  }
};

module.exports = {
  getToken,
  isAuth,
  isAdmin,
};
