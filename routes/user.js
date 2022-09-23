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
const showCase = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/showCases');
const Post = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/post');
const Msg = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/messages')

const UserNames = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/usernames');

const user = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/user');
const { single } = require('rxjs');



// mail sender details
var transporter = nodemailer.createTransport({
    service: 'outlook365',
    auth: {
        // gmail just change to gmail email and service to gmail
        user: 'skalarly_77777@outlook.com',
        pass: 'Hockey#$07'
    },
    tls: {
        rejectUnauthorized: false,
    },

})


const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
};

// Only this one is being accessed
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(null, './backend/profilePics');

    },
    filename: (req, file, cb) => {
        if (file) {
            const name = file.originalname.toLowerCase();
            // const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, name)
            // + '-' + Date.now() + '.' + ext);
        } else {
            console.log('No profile pic')
        }
    },
});







// Creating user
router.post("/signup", async (req, res, next) => {
    try {
        const userEmail = await User.findOne({ email: req.body.email });
        const userName = await User.findOne({ userName: req.body.username });
        if (!(userEmail && userName)) {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = new User({
                        email: req.body.email,
                        emailToken: crypto.randomBytes(64).toString('hex'),
                        isVerified: 'false',
                        username: req.body.username,
                        password: hash,
                    });
                    user.save().then(result => {
                        res.status(201).json({
                            message: 'Yay a new User!',
                            result: result
                        });
                    })
                        .catch(err => {
                            // res.status(500).json({
                            //         message: 'Email or Username invalid!'     
                            // });
                            res.redirect('/sign-up')

                        });
                    const msg = {
                        from: ' "Verify account" <skalarly_77777@outlook.com>',
                        to: user.email,
                        subject: 'Skalarly - verify account',
                        text: `We are excited to welcome you ${user.username} to the community!
                Please copy and paste the link below to verify your account.
                http://${req.headers.host}/api/user/verify-email?token=${user.emailToken}
                `,
                        html: `
                <h2>We are excited to welcome you ${user.username} to the community!</h2>
                <div> Please click the link below to verify your account. </div>
                <a href="http://${req.headers.host}/api/user/verify-email?token=${user.emailToken}">Verify account</a>
                <div>If you have recieved this email by erorr, please disregard. </div>
                `
                    }
                    // Sending mail
                    transporter.sendMail(msg, (error, info) => {
                        if (error) {
                            console.log(error)
                        }
                        else {

                            console.log('Verification has been sent to email')
                        }

                    })

                });
        } else {
            res.status(500).json({
                message: 'Email or Username is taken',
            });
            console.log('Username or email is taken!')
        }
    } finally { }

});

router.get('/verify-email', async (req, res, next) => {
    try {
        const token = req.query.token;
        const user = await User.findOne({ emailToken: token });
        if (user) {
            user.emailToken = null;
            user.isVerified = 'true';
            await user.save()
            res.redirect('/verified')
        } else {
            res.redirect('/sign-up')
            console.log('error', 'Invalid authentication. Please try again.');

        }
        //    Runs regardless of result
    } finally {

    }


})

const verifyEmail = async (req, res, next) => {
    try {
        const test = await User.findOne({ email: req.body.email })
        // console.log('boobs', test)
        if (test) {
            await User.findOne({ email: req.body.email }).then(user => {
                if (user.isVerified === 'true') {
                    next()

                } else {
                    console.log('Please check email to verify your account.')
                }
            })
            // .catch(err => {
            //     console.log('what up homie??')
            //     return res.status(401).json({
            //     message: "No user matches our records!",
            //             })
            //     });

        } else {
            return res.status(401).json({
                message: "No user matches our records!",
            })
        }
    } catch (err) {
        console.log(err)
    }
}
const verifyEmailV = async (req, res, next) => {
    try {
        const test = await User.findOne({ email: req.body.emailV })
        // console.log('boobs', test)
        if (test) {
            await User.findOne({ email: req.body.emailV }).then(user => {
                if (user.isVerified === 'true') {
                    next()

                } else {
                    console.log('Please check email to verify your account.')
                    return res.status(401).json({
                        message: "No validated email matches our records! ",
                    })
                }
            })
            // .catch(err => {
            //     console.log('what up homie??')
            //     return res.status(401).json({
            //     message: "No user matches our records!",
            //             })
            //     });

        } else {
            return res.status(401).json({
                message: "No user matches our records!",
            })
        }
    } catch (err) {
        console.log(err)
    }
}

// Reset password
router.post('/forgot', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        //    Check users existence
        if (!user) {
            res.status(500).json({
                message: 'This email does not exist, or is not verified.'
            })
        }
        const msg = {
            from: ' "Reset Password" <skalarly_77777@outlook.com>',
            to: user.email,
            subject: 'Skalarly - reset password',
            text: `Hello ${user.username} we hear you forgot your password.
        Here is your reset code ${user.password} then copy and paste the link below to navigate back
        http://${req.headers.host}/api/user/reset-password
        If you have recieved this email by erorr, please disregard.
        `,
            html: `
        <h2>Hello ${user.username} we hear you forgot your password.</h2>
        <div> Here is your reset code. Copy this and keep it a secret! </div>
        ${user.password}
        <div> Now follow the below link </div>
       <a href="http://${req.headers.host}/api/user/reset-password">Follow link</a>
        <div>If you have recieved this email by erorr, please disregard. </div>
        `
        }
        // Sending mail
        transporter.sendMail(msg, (error, info) => {
            if (error) {
                console.log(error)
            }
            else {

                console.log('Password reset has been sent to email')
            }

        })
    } finally { }

})

router.get('/reset-password', async (req, res, next) => {
    try {
        res.redirect('/resetPassword')
        // const token = req.query.token;
        // const user = await User.findOne( {password: token});

        // Check if id exists in database
        // if (user){
        //     res.redirect('/resetPassword')
        // }


    } finally {

    }
})

router.post('/reset-password', async (req, res, next) => {
    try {
        const secretCode = await User.findOne({ secretCode: req.body.secretCode })
        if (secretCode) {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    User.updateOne({ password: hash })
                        .then(result => {
                            res.status(201).json({
                                message: 'Password changed successfully',
                                result: result
                            });
                        })
                })
            console.log('Password changed successfully');
        }
    } finally {
        // console.log('Complete')
    }
})





// User info
const pic = multer({ storage: storage })
router.post("/info", checkAuth,
    pic.single('profilePic'),
    // pic.single('profilePic'),
    // pic_2.single('showCase'), 
    (req, res, next) => {
        const url = req.protocol + '://' + req.get('host');
        var info = new UserInfo({
            username: req.body.username,
            name: req.body.name,
            bio: req.body.bio,
            gender: req.body.gender,
            birthday: req.body.birthday,
            major: req.body.major,
            minor: req.body.minor,
            sport: req.body.sport,
            club: req.body.club,
            pronouns: req.body.pronoun,
            CodeCompleted: req.body.CodeCompleted,
            CodeCompleted2: req.body.CodeCompleted2,
            CodeCompleted3: req.body.CodeCompleted3,
            CodeCompleted4: req.body.CodeCompleted4,
            CodeCompleted5: req.body.CodeCompleted5,
            CodeCompleted6: req.body.CodeCompleted6,
            CodeCompleted7: req.body.CodeCompleted7,
            CodeCompleted8: req.body.CodeCompleted8,
            CodeCompleted9: req.body.CodeCompleted9,
            CodeCompleted10: req.body.CodeCompleted10,
            CodeCompleted11: req.body.CodeCompleted11,
            CodeCompleted12: req.body.CodeCompleted12,
            CodeCompleted13: req.body.CodeCompleted13,
            CodeCompleted14: req.body.CodeCompleted14,
            CodeCompleted15: req.body.CodeCompleted15,
            CodeCompleted16: req.body.CodeCompleted16,
            CodeCompleted17: req.body.CodeCompleted17,
            CodeCompleted18: req.body.CodeCompleted18,
            CodeCompleted19: req.body.CodeCompleted19,
            CodeCompleted20: req.body.CodeCompleted20,
            CodeCompleted21: req.body.CodeCompleted21,
            CodeCompleted22: req.body.CodeCompleted22,
            CodeCompleted23: req.body.CodeCompleted23,
            CodeCompleted24: req.body.CodeCompleted24,
            CodeCompleted25: req.body.CodeCompleted25,
            CodeCompleted26: req.body.CodeCompleted26,
            CodeCompleted27: req.body.CodeCompleted27,
            CodeCompleted28: req.body.CodeCompleted28,
            CodeCompleted29: req.body.CodeCompleted29,
            CodeCompleted30: req.body.CodeCompleted30,
            CodeCompleted31: req.body.CodeCompleted31,
            CodeCompleted32: req.body.CodeCompleted32,
            CodeCompleted33: req.body.CodeCompleted33,
            CodeCompleted34: req.body.CodeCompleted34,
            CodeCompleted35: req.body.CodeCompleted35,
            CodeCompleted36: req.body.CodeCompleted36,
            CodeCompleted37: req.body.CodeCompleted37,
            CodeCompleted38: req.body.CodeCompleted38,
            CodeCompleted39: req.body.CodeCompleted39,
            CodeCompleted40: req.body.CodeCompleted40,
            CodeCompletedX: req.body.CodeCompletedX,
          
            CodePursuing: req.body.CodePursuing,
            CodePursuing2: req.body.CodePursuing2,
            CodePursuing3: req.body.CodePursuing3,
            CodePursuing4: req.body.CodePursuing4,
            CodePursuing5: req.body.CodePursuing5,
            CodePursuing6: req.body.CodePursuing6,
            CodePursuing7: req.body.CodePursuing7,
            CodePursuing8: req.body.CodePursuing8,
            CodePursuing9: req.body.CodePursuing9,
            CodePursuing10: req.body.CodePursuing10,
            CodePursuing11: req.body.CodePursuing11,
            CodePursuing12: req.body.CodePursuing12,

            ProfilePicPath: url + '/profilePics/' + req.file.filename,
            // ShowCasePath: url + '/profilePics/' + req.files['showCase'][0].filename,
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


// edit info
const pic_ = multer({ storage: storage })
router.post("/infoEd", checkAuth,
    pic_.single('profilePic'),
    async (req, res, next) => {
        const url = req.protocol + '://' + req.get('host');
        let username
        let fetchedUser;
  
                if(req.file){
                    await UserInfo.updateOne({Creator:req.query.userId },{ProfilePicPath: url + '/profilePics/' + req.file.filename})
                }
             if(req.body.name){
                     await UserInfo.updateOne({Creator:req.query.userId },{name: req.body.name})
                 }
                 if(req.body.bio){
                    await UserInfo.updateOne({Creator:req.query.userId },{bio: req.body.bio})
                }
            if(req.body.birthday){
                await UserInfo.updateOne({Creator:req.query.userId },{birthday: req.body.birthday})
                 }              
            if(req.body.gender){
                    await UserInfo.updateOne({Creator:req.query.userId },{gender: req.body.gender})
                     }   
             if(req.body.pronoun){
                        await UserInfo.updateOne({Creator:req.query.userId },{pronouns: req.body.pronoun})
                         }       
            if(req.body.major){
                            await UserInfo.updateOne({Creator:req.query.userId },{major: req.body.major})
                             }    
             if(req.body.minor){
                                await UserInfo.updateOne({Creator:req.query.userId },{minor: req.body.minor})
                                 }    
             if(req.body.sport){
                                await UserInfo.updateOne({Creator:req.query.userId },{sport: req.body.sport})
                                     }    
            if(req.body.club){
                                     await UserInfo.updateOne({Creator:req.query.userId },{club: req.body.club})
                                         }     
            if(req.body.CodeCompleted){
                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted: req.body.CodeCompleted})
                                                }    
                                                if(req.body.CodeCompleted2){
                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted2: req.body.CodeCompleted2})
                                                        }               if(req.body.CodeCompleted3){
                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted3: req.body.CodeCompleted3})
                                                                }               if(req.body.CodeCompleted4){
                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted4: req.body.CodeCompleted4})
                                                                        }               if(req.body.CodeCompleted5){
                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted5: req.body.CodeCompleted5})
                                                                                }               if(req.body.CodeCompleted6){
                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted6: req.body.CodeCompleted6})
                                                                                        }               if(req.body.CodeCompleted7){
                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted7: req.body.CodeCompleted7})
                                                                                                }               if(req.body.CodeCompleted8){
                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted8: req.body.CodeCompleted8})
                                                                                                        }               if(req.body.CodeCompleted9){
                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted9: req.body.CodeCompleted9})
                                                                                                                }               if(req.body.CodeCompleted10){
                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted10: req.body.CodeCompleted10})
                                                                                                                        }               if(req.body.CodeCompleted11){
                                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted11: req.body.CodeCompleted11})
                                                                                                                                }               if(req.body.CodeCompleted12){
                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted12: req.body.CodeCompleted12})
                                                                                                                                        }               if(req.body.CodeCompleted13){
                                                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted13: req.body.CodeCompleted13})
                                                                                                                                                }               if(req.body.CodeCompleted14){
                                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted14: req.body.CodeCompleted14})
                                                                                                                                                        }               if(req.body.CodeCompleted15){
                                                                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted15: req.body.CodeCompleted15})
                                                                                                                                                                }               if(req.body.CodeCompleted16){
                                                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted16: req.body.CodeCompleted16})
                                                                                                                                                                        }               if(req.body.CodeCompleted17){
                                                                                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted17: req.body.CodeCompleted17})
                                                                                                                                                                                }               if(req.body.CodeCompleted18){
                                                                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted18: req.body.CodeCompleted18})
                                                                                                                                                                                        }               if(req.body.CodeCompleted19){
                                                                                                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted19: req.body.CodeCompleted19})
                                                                                                                                                                                                }               if(req.body.CodeCompleted20){
                                                                                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted20: req.body.CodeCompleted20})
                                                                                                                                                                                                        }               if(req.body.CodeCompleted21){
                                                                                                                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted21: req.body.CodeCompleted21})
                                                                                                                                                                                                                }               if(req.body.CodeCompleted22){
                                                                                                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted22: req.body.CodeCompleted22})
                                                                                                                                                                                                                        }               if(req.body.CodeCompleted23){
                                                                                                                                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted23: req.body.CodeCompleted23})
                                                                                                                                                                                                                                }               if(req.body.CodeCompleted24){
                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted24: req.body.CodeCompleted24})
                                                }               if(req.body.CodeCompleted25){
                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted25: req.body.CodeCompleted25})
                                                        }               if(req.body.CodeCompleted26){
                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted26: req.body.CodeCompleted26})
                                                                }               if(req.body.CodeCompleted27){
                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted27: req.body.CodeCompleted27})
                                                                        }               if(req.body.CodeCompleted28){
                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted28: req.body.CodeCompleted28})
                                                                                }               if(req.body.CodeCompleted29){
                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted29: req.body.CodeCompleted29})
                                                                                        }     if(req.body.CodeCompleted30){
                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted30: req.body.CodeCompleted30})
                                                                                                }               if(req.body.CodeCompleted31){
                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted31: req.body.CodeCompleted31})
                                                                                                        }               if(req.body.CodeCompleted32){
                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted32: req.body.CodeCompleted32})
                                                                                                                }               if(req.body.CodeCompleted33){
                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted33: req.body.CodeCompleted33})
                                                                                                                        }               if(req.body.CodeCompleted34){
                                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted34: req.body.CodeCompleted34})
                                                                                                                                }   
                                                                                                                                if(req.body.CodeCompleted35){
                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted35: req.body.CodeCompleted35})
                                                                                                                                        }               if(req.body.CodeCompleted36){
                                                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted36: req.body.CodeCompleted36})
                                                                                                                                                }               if(req.body.CodeCompleted37){
                                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted37: req.body.CodeCompleted37})
                                                                                                                                                        }               if(req.body.CodeCompleted38){
                                                                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted38: req.body.CodeCompleted38})
                                                                                                                                                                }               if(req.body.CodeCompleted39){
                                                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted39: req.body.CodeCompleted39})
                                                                                                                                                                        }   
                                                                                                                                                                        if(req.body.CodeCompleted40){
                                                                                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodeCompleted40: req.body.CodeCompleted40})
                                                                                                                                                                                }               if(req.body.CodeCompletedX){
                                                                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodeCompletedX: req.body.CodeCompletedX})
                                                                                                                                                                                        } 


                                                                                                                                                                        if(req.body.CodePursuing){
                                                                                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodePursuing: req.body.CodePursuing})
                                                                                                                                                                                }    
                                                                                                                                                                                if(req.body.CodePursuing2){
                                                                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodePursuing2: req.body.CodePursuing2})
                                                                                                                                                                                        }               if(req.body.CodePursuing3){
                                                                                                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodePursuing3: req.body.CodePursuing3})
                                                                                                                                                                                                }               if(req.body.CodePursuing4){
                                                                                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodePursuing4: req.body.CodePursuing4})
                                                                                                                                                                                                        }               if(req.body.CodePursuing5){
                                                                                                                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodePursuing5: req.body.CodePursuing5})
                                                                                                                                                                                                                }               if(req.body.CodePursuing6){
                                                                                                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodePursuing6: req.body.CodePursuing6})
                                                                                                                                                                                                                        }               if(req.body.CodePursuing7){
                                                                                                                                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodePursuing7: req.body.CodePursuing7})
                                                                                                                                                                                                                                }               if(req.body.CodePursuing8){
                                                                                                                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodePursuing8: req.body.CodePursuing8})
                                                                                                                                                                                                                                        }               if(req.body.CodePursuing9){
                                                                                                                                                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodePursuing9: req.body.CodePursuing9})
                                                                                                                                                                                                                                                }               if(req.body.CodePursuing10){
                                                                                                                                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodePursuing10: req.body.CodePursuing10})
                                                                                                                                                                                                                                                        }               if(req.body.CodePursuing11){
                                                                                                                                                                                                                                                            await UserInfo.updateOne({Creator:req.query.userId },{CodePursuing11: req.body.CodePursuing11})
                                                                                                                                                                                                                                                                }               if(req.body.CodePursuing12){
                                                                                                                                                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodePursuing12: req.body.CodePursuing12})
                                                                                                                                                                                                                                                                }         if(req.body.CodePursuing13){
                                                                                                                                                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodePursuing13: req.body.CodePursuing13})
                                                                                                                                                                                                                                                                }         if(req.body.CodePursuing14){
                                                                                                                                                                                                                                                                    await UserInfo.updateOne({Creator:req.query.userId },{CodePursuing14: req.body.CodePursuing14})
                                                                                                                                                                                                                                                                }
    });




// userInfo recieving
router.get("/info", async(req, res, next) => {
    const counter = req.query.counter;
    console.log('street crimes 2 ', counter);

    await UserInfo.find().skip(counter).limit(6)
        // .select('-password') if i was fetching user info, dont want password passed on front end
        .then(documents => {
            res.status(200).json({
                message: 'Users fetched succesfully!',
                infos: documents
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching users failed!'
            });
        });
});



// userInfo recieving
router.get("/infoPersonal", async(req, res, next) => {
     await UserInfo.find({Creator: req.query.userId})
    .then(docs => {
            res.status(200).json({
                message: 'Posts personal fetched succesfully!',
                infos: docs
       });
    })  
    .catch(error => {
        res.status(500).json({
            message: 'Fetching personal infos failed!'
        });
    });
}); 

// Get user
router.get("/id", async(req, res) => {
 await UserInfo.find({username: {$eq: req.query.id}})
        .then(documents => {
         
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

// Follow a user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await UserInfo.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("User has been followed");
            } else {
                res.status(403).json("You allready follow this user")
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't follow yourself")
    }
})

// unfollow a user 
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await UserInfo.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("User has been unfollowed");
            } else {
                res.status(403).json("You don't follow this user")
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't unfollow yourself")
    }
})


// LoginFirst Time
router.post("/login1", verifyEmailV, async (req, res, next) => {
    let fetchedUser;
    let VALID;
   await User.findOne({ email: req.body.emailV }).then(valid => {
        VALID = valid.isVerified
        if (VALID === 'true') {
            console.log('valid?', VALID)
            //  Two try with the one thats breaking happen second becase thatll show we don't want that
            // user any ways! Maybe use switch!
            User.findOne({ email: req.body.emailV })
                .then(user => {

                    if (!user) {
                        console.log(user.isVerified)
                        return res.status(401).json({
                            message: "Authentication failed "
                        });
                    }
                    console.log('verified', user.isVerified)
                    fetchedUser = user;
                    return bcrypt.compare(req.body.passwordV, user.password)

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
                        message: "Invalid authentication credentials!",

                    })
                })
        } else {
            // return res.status(401).json({
            //     message: "Non-validated account!",

            // })
            console.log('Thats weird...')
        }

    }, 
    reason => {
        console.error(reason);
        return res.status(401).json({
            message: "No user matches our records!",

        });
    }
    )

});





// Login
router.post("/login", verifyEmail, async (reg, res, next) => {
    let fetchedUser;

    await User.findOne({ email: reg.body.email })
    .then(test1 => {
        UserInfo.findOne({username: test1.username})
        .then( userInfo => {
            if (!userInfo) {
                return res.status(401).json({
                    message: "Your account was made improperly. Please delete it and try again!"
                });
            }
if(userInfo){

    User.findOne({ email: reg.body.email })
        .then(user => {
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
                // { expiresIn: '1h' }
            );
            res.status(200).json({
                token: token,
                expiresIn: 216000,
                userId: fetchedUser._id
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Invalid authentication credentials!",

            });
        });
        
    }
})
})

});
// Search users
router.post('/getusers', async (req, res) => {
    let payload = req.body.payload;
    let search = await UserInfo.find({
        username: {
            $regex: new RegExp('^' + payload + '.*',
                'i')
        }
    }).limit(7).exec();
    search = search.slice(0, 10);


    res.send({ payload: search })
});


// Deleting account
router.post('/delete', async (req, res) => {
//     console.log('hey')
      let username
        let fetchedUser;
        await User.findOne({ email: req.body.emailDel })
        .then(user => {
            username = user.username;
            if (!user) {
                return res.status(401).json({
                    message: "Authentication failed "
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.passwordDel, user.password)
        })
        .then(result => {
            console.log('user',result)
            if (!result) {
                return res.status(401).json({
                    message: "Authentication failed "
                });

            }
                })
                .catch(err => {
                    return res.status(401).json({
                        message: "Invalid authentication credentials!",

                    });
                });
                try{
              await User.findOneAndDelete( {username: username})
            await UserInfo.findOneAndDelete({username:username})
                }finally{
                    res.status(200).json({
                        message: 'Deleted Successful!',
                    })
                }
     
})

module.exports = router;