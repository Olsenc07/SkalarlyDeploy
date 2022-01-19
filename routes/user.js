const express = require('express');
const bcrypt = require('bcrypt')

const User = require('../models/user');

const router = express.Router();


router.post('/signup', (req, res, next) => {
    bcrypt.hash(reg.body.password, 10).then(hash => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,

    });
    user.save()
        .then(result => {
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

module.exports = router;