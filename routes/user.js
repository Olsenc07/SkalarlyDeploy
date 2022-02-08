const express = require('express');
const multer = require('multer');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkAuth = require('/Users/chaseolsen/angular_scholarly_fs/backend/middleware/check-auth');
const User = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/user');
const UserInfo = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/userInfo');

const MIME_TYPE_MAP ={
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
};

const storage  = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid){
            error = null;
        }    
        cb(null, './backend/profilePics');   
  
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase();
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    },
    
});





// Creating user
router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                username: req.body.username,
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
                            message: 'Email or Username invalid!'
                    });
                });
        });
});

const pic = multer({ storage: storage});


// User info
    router.post("/info", checkAuth,
            pic.fields([{name: 'profilePic', maxCount: 1},
                        {name: 'showCase'}
        ]), (req, res, next) => {
            const url = req.protocol + '://' + req.get('host');
            const info = new UserInfo({
                username: req.body.username,
                name: req.body.name,
                gender: req.body.gender,
                birthday: req.body.birthday,
                major: req.body.major,
                minor: req.body.minor,
                sport: req.body.sport,
                club: req.body.club,
                pronouns: req.body.pronouns,
                CodePursuing: req.body.CodePursuing,
                CodeCompleted: req.body.CodeCompleted,
                ProfilePicPath: url + '/ProfilePic/' + req.files.filename,
                ShowCasePath: url + '/ShowCase/' + req.files.filename,
                Creator: req.userData.userId,


            });
            info.save().then(result => {
                res.status(201).json({
                    message: 'Yay a user added info',
                    post: {
                    id: result._id,
                    ...result
                    }
                });
            })
                .catch(err => {
                    res.status(500).json({
                            message: 'Unable to add information'
                    });
                });
});

// userInfo recieving
router.get("/info", (req, res, next) => {
    UserInfo.find().then(documents => {
    res.status(200).json({
        message: 'Infos fetched succesfully!',
        infos: documents
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Fetching infos failed!'
        });
    });
});


// Login
router.post("/login", (reg, res, next) => {
    let fetchedUser;
    User.findOne({ email: reg.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Authentication failed "
                });
            }
            fetchedUser = user;
            return bcrypt.compare(reg.body.password, user.password)
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Authentication failed "
                });
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id },
                'And_Even_When_I_Cant_Say_I_Love_You_I_Love_You',
                { expiresIn: '1h' }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
                    });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Invalid authentication credentials!"
            });
        });
});

module.exports = router;