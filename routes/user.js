const express = require('express');
const multer = require('multer');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const checkAuth = require('/Users/chaseolsen/angular_scholarly_fs/backend/middleware/check-auth');
const User = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/user');
const UserInfo = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/userInfo');

// mail sender details
var transporter = nodemailer.createTransport({
    service: 'outlook365',
    auth: {
        // gmail just change to gmail email and service to gmail
        user: 'skalarly777@outlook.com',
        pass: 'Hockey07'
    },
    tls: {
        rejectUnauthorized: false,
     },
  
})



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
                emailToken: crypto.randomBytes(64).toString('hex'),
                isVerified: false,
                username: req.body.username,
                password: hash,
            });
            const msg ={
                from:' "Verify account"   <skalarly777@outlook.com>',
                to: user.email,
                subject: 'Skalarly - verify account',
                text: `We are excited to welcome you to the community!
                Please copy and paste the link below to verify your account.
                http://${req.headers.host}/user/verify-email?token=${user.emailToken}`,
                html: `
                <div>We are excited to welcome you to the community!</div>
                <div> Please click the link below to verify your account. </div>
                <a href="http://${req.headers.host}/user/verify-email?token=${user.emailToken}">Verify account</a>
                `
            }
            // Sending mail
            transporter.sendMail(msg, (error, info) => {
                if (error){
                    console.log(error)
                }
                else {
                    console.log('Verification has been sent to email')
                }
                
            })

        });
});

router.get('/verify-email', async(req, res, next) => {
    try {
        const token = req.query.token;
        const user = await User.findOne({ emailToken: req.emailToken.token});
        if (!user) {
            req.flash('error', 'Invalid authentication. Please try again.' );
        }
        user.emailToken = null;
        user.isVerified = true;
         await user.save().then(result => {
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

    }finally {

    }
})


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
                followers: null,
                following: null,
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