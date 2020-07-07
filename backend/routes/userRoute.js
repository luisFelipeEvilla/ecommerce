const router = require("express").Router();
const User = require("../models/userModel");
const { getToken, hashPassword, checkPassword } = require("../utils/authentication");

// signin (existing user)

router.post("/signin", async (req, res) => {
  try {
    const signinUser = await User.findOne({
      email: req.body.email
    });

    if (signinUser && checkPassword(req.body.password, signinUser.password)) {
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser), //jwt token
      });
    } else {
      res.status(401).send({ message: "Invalidad Email or Password" });
    }
  } catch (error) {
    res.status(500).send({ message: "There was a server error" });
  }
});

// create new user

router.post("/signup", async (req, res) => {
  try {
    const signupUser = new User();
    signupUser.name = req.body.name;
    signupUser.email = req.body.email;
    signupUser.password = hashPassword(req.body.password);
    signupUser.isAdmin = false;

    await signupUser.save();
    if (signupUser) {
      res.status(201).send({
        _id: signupUser._id,
        name: signupUser.name,
        email: signupUser.email,
        token: getToken(signupUser), // jwt token
      });
    }
  } catch (error) {
    if (
      error.code == 11000 && "email" in error.keyPattern
    ) {
      res.status(400).send({ message: "Already exists a account with this email"})
    }
    res.status(500).send({ message: "There was a server error"});
  }
});

module.exports = router;
