const router = require('express').Router();
const User = require('../models/userModel');
const { getToken } = require('../utils');

router.post('/signin', async (req, res) => {

    try {
        const signinUser = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });

        if (signinUser) {
            res.send({
                _id: signinUser.id,
                name: signinUser.name,
                email: signinUser.email,
                isAdmin: signinUser.isAdmin,
                token: getToken(signinUser)
            })
        } else {
            res.status(401).send({ msg: 'Invalidad Email or Password' })
        }
    } catch (error) {
        res.status(500).send();
    }

})

router.post("/signup", async (req, res) => {
    const signupUser = new User();

    signupUser.name = req.body.name;
    signupUser.email = req.body.email;
    signupUser.password = req.body.password;
    signupUser.isAdmin = false;

    try {
        await signupUser.save();
        if (signupUser) {
            res.status(201).send({
                _id: signupUser._id,
                name: signupUser.name,
                email: signupUser.email,
                token: getToken(signupUser)
            });
        }
    } catch (error) {
        res.status(400).send();
    }
})

router.get("/createAdmin", async (req, res) => {
    try {
        const user = new User({
            name: "Luis",
            email: "tupapiRico@gmail.com",
            password: "1234",
            isadmin: true
        })
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({ msg: error.message })
    }
})

module.exports = router;