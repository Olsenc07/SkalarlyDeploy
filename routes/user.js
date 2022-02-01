const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/user');




router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user.save().then(result => {
                res.status(201).json({
                    message: 'Yay a new User!!',
                    result: result
                });
            })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        });
});



router.post("/login", (reg, res, next) => {
    let fetchedUser;
    User.findOne({ email: reg.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed :("
                });
            }
            fetchedUser = user;
            return bcrypt.compare(reg.body.password, user.password)
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed :(("
                });
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                'And_Even_When_I_Cant_Say_I_Love_You_I_Love_You',
                { expiresIn: '1h', }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
                    });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });
});

module.exports = router;