// @login and register routes
const express = require('express');
const User = require('../../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');




// $route GET api/users/register
// @desc Tests users route
// @access Public
router.post("/register", (req, res) => {

    // check if email exists 
    User.findOne({ email:req.body.email })
        .then((user) => {
            if(user){
                return res.status(400).json("Email already exists");
            }else{
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    identity: req.body.identity
                })

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err));
                    });
                });
            }
        })
});

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(404).json( "User not found");
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        const rule = {id: user.id, name: user.name, identity: user.identity};
                        jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
                            if(err) throw err;
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            });
                        });
                    }else{
                        return res.status(400).json( "Password incorrect");
                    }
                })
        });
});

router.get("/current", passport.authenticate("jwt",{session:false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    });
});

module.exports = router;