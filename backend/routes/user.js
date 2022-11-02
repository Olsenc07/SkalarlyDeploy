const express = require('express');
const multer = require('multer');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const checkAuth = require('/app/backend/middleware/check-auth');
const User = require('/app/backend/models/user');
const UserInfo = require('/app/backend/models/userInfo');
const cloudinary = require('cloudinary').v2
// cloudinary
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret,
    // Untag when https
    // secure: true
  });




// mail sender details
var transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    name: 'www.skalarly.com',
    service: 'outlook365',
    auth: {
        // gmail just change to gmail email and service to gmail
        user: process.env.user,
        pass: process.env.pass
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


const storage = multer.diskStorage({   
    filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase();
    // const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name );
        // + '-' + Date.now() + '.' + ext);
    }
});
const storage2 = multer.diskStorage({   
    filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase();
    // const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name );
        // + '-' + Date.now() + '.' + ext);
    }
});
const limits = { fileSize: 1000 * 1000 * 10 }; // limit to 10mb







// Creating user
router.post("/signup", async (req, res, next) => {
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
                            res.status(500).json({
                                    message: 'Email or Username invalid!'     
                            });
                            res.redirect('/sign-up')

                        });
                    const msg = {
                        from: ' "Verify account" <admin@skalarly.com>',
                        to: user.email,
                        replyTo: 'Do not reply',
                        subject: 'Skalarly - verify account',
                        text: `We are excited to welcome you ${user.username} to the community!
                Please copy and paste the link below to verify your account.
                http://www.skalarly.com/api/user/verify-email?token=${user.emailToken}
                `,
                        html: `
                <h2>We are excited to welcome you ${user.username} to the community!</h2>
                <div> Please click the link below to verify your account. </div>
                <a href="http://www.skalarly.com/api/user/verify-email?token=${user.emailToken}">Verify account</a>
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
    
});

router.get('/verify-email', async (req, res, next) => {
        const token = req.query.token;
        const user = await User.findOne({ emailToken: token });
        if (user) {
            user.emailToken = null;
            user.isVerified = 'true';
            await user.save()
            res.redirect('/verified')
            res.status(200)
           
        } else {
            res.redirect('/sign-up')
    
            console.log('Invalid authentication. Please try again.');

        }

})

const verifyEmail = async (req, res, next) => {
    try {
        const test = await User.findOne({ email: req.body.email })
        // console.log('boobs', test)
        if (test) {
            await User.findOne({ email: req.body.email })
            .then(user => {
                if (user.isVerified === 'true') {
                    next()
                    res.status(200)
                } else {
                    console.log('Please check email to verify your account.')
                }
            })
            .catch(err => {
                console.log('what up homie??')
                return res.status(401)
                });

        } else {
            return res.status(401).json({
                message: "No user matches our records 2!",
            })
        }
    } catch (err) {
        console.log(err)
    }
}
const verifyEmailV = async (req, res, next) => {
    try {
        const test = await User.findOne({ email: req.body.emailV })
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
        const user = await User.findOne({ email: req.body.email });
        //    Check users existence
        if (!user) {
            res.status(500).json({
                message: 'This email does not exist, or is not verified.'
            })
        }
        const msg = {
            from: ' "Reset Password" <admin@skalarly.com>',
            to: user.email,
            replyTo: 'Do not reply',
            subject: 'Skalarly - reset password',
            text: `Hello ${user.username} we hear you forgot your password.
        Here is your reset code ${user.password} then copy and paste the link below to navigate back
        http://www.skalarly.com/api/user/reset-password
        If you have recieved this email by erorr, please disregard.
        `,
            html: `
        <h2>Hello ${user.username} we hear you forgot your password.</h2>
        <div> Here is your reset code. Copy this and keep it a secret! </div>
        ${user.password}
        <div> Now follow the below link </div>
       <a href="http://www.skalarly.com/api/user/reset-password">Follow link</a>
        <div>If you have recieved this email by erorr, please disregard. </div>
        `
        }
        // Sending mail
        transporter.sendMail(msg, (error, info) => {
            if (error) {
                console.log(error)
                res.status(500)
            }
            else {
                console.log('Password reset has been sent to email');
                res.status(200)
            }

        })
    

})

router.get('/reset-password', async (req, res, next) => {
 
        res.redirect('/resetPassword')
        .then(() => {
            res.status(200)
            console.log('Reset password redirect!')
        })
        // const token = req.query.token;
        // const user = await User.findOne( {password: token});

        // Check if id exists in database
        // if (user){
        //     res.redirect('/resetPassword')
        // }

})

router.post('/reset-password', async (req, res, next) => {
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
                .catch(err => {
                    return res.status(401).json({
                        message: "Password changed error!",
                
                    })
                })
            console.log('Password changed successfully');
        }
   
})


// User info
const pic = multer({ storage: storage, limits })
router.post("/info", 
    checkAuth,
    pic.single('profilePic'),
    (req, res) => {
         cloudinary.uploader.upload(req.file.path, {
            folder:'ProfilePics'
         })
         .then(result => {
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
            CodePursuing13: req.body.CodePursuing13,
            CodePursuing14: req.body.CodePursuing14,
            ProfilePicPath: result.secure_url,
            cloudinary_id: result.public_id,
            Creator: req.userData.userId
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
    })
    });
        // edit Name
router.patch("/infoName", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{name: ''}) .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
    // edit Bio
router.patch("/infoBio", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{bio: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Major
router.patch("/infoMajor", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{major: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit sport
router.patch("/infoMinor", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{minor: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit club
router.patch("/infoClub", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{club: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})

// edit sport
router.patch("/infoSport", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{sport: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse2", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted2: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse3", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted3: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse4", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted4: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse5", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted5: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse6", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted6: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse7", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted7: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse8", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted8: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse9", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted9: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse10", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted10: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse11", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted11: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse12", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted12: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse13", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted13: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse14", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted14: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse15", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted15: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse16", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted16: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse17", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted17: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse18", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted18: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse19", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted19: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse20", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted20: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse21", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted21: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse22", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted22: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse23", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted23: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse24", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted24: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse25", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted25: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse26", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted26: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse27", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted27: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse28", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted28: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse29", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted29: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse30", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted30: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse31", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted31: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse32", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted32: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse33", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted33: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse34", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted34: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse35", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted35: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse36", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted36: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse37", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted37: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse38", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted38: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse39", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted39: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourse40", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted40: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Complete 1
router.patch("/infoCourseX", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompletedX: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})

// edit Next Course
router.patch("/infoNext", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Next Course
router.patch("/infoNext2", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing2: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Next Course
router.patch("/infoNext3", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing3: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Next Course
router.patch("/infoNext4", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing4: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Next Course
router.patch("/infoNext5", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing5: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Next Course
router.patch("/infoNext6", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing6: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Next Course
router.patch("/infoNext7", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing7: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Next Course
router.patch("/infoNext8", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing8: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Next Course
router.patch("/infoNext9", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing9: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Next Course
router.patch("/infoNext10", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing10: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Next Course
router.patch("/infoNext11", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing11: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Next Course
router.patch("/infoNext12", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing12: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Next Course
router.patch("/infoNext13", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing13: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})
// edit Next Course
router.patch("/infoNext14", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing14: ''})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
})





// edit info
// Break this up chase into different routes and edit.serivice.ts
// infoEd broken up!!
const pic_ = multer({ storage: storage2, limits})
router.patch("/infoEd", checkAuth,
    pic_.single('profilePic'),
    async(req, res, next) => {
        try{
                if(req.file){
                    await cloudinary.uploader.upload(req.file.path, {
                    folder:'ProfilePics'
                 }).then(result => {
                     UserInfo.updateOne({Creator:req.query.userId },
                        [{ProfilePicPath: result.secure_url}, {cloudinary_id: result.public_id}])   
                         .then(update => {
                            res.status(200).json({
                                message: 'Clean update',
                                post: update
                            });
                        })
                })
            }
             if(req.body.name){
                await UserInfo.updateOne({Creator:req.query.userId },{name: req.body.name})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })
                 }
                 if(req.body.bio){
                    await  UserInfo.updateOne({Creator:req.query.userId },{bio: req.body.bio})
                    .then(update => {
                        res.status(200).json({
                            message: 'Clean update',
                            post: update
                        });
                    })
                }
            if(req.body.birthday){
                await UserInfo.updateOne({Creator:req.query.userId },{birthday: req.body.birthday})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })
                 }              
            if(req.body.gender){
                await UserInfo.updateOne({Creator:req.query.userId },{gender: req.body.gender})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })
                     }   
             if(req.body.pronoun){
                await UserInfo.updateOne({Creator:req.query.userId },{pronouns: req.body.pronoun})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })
                         }       
            if(req.body.major){
                await UserInfo.updateOne({Creator:req.query.userId },{major: req.body.major})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })
                             }    
             if(req.body.minor){
                await UserInfo.updateOne({Creator:req.query.userId },{minor: req.body.minor})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })
                                 }    
             if(req.body.sport){
                await UserInfo.updateOne({Creator:req.query.userId },{sport: req.body.sport})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })
                                     }    
            if(req.body.club){
                await UserInfo.updateOne({Creator:req.query.userId },{club: req.body.club})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })
                       }
        }catch{
        console.log('got this far ')
                   return res.status(500).json({
               message: "Invalid update error!",
                })
                                        
       }       
            
    });
    router.patch("/infoEdComp1", 
    checkAuth,
    (req, res, next) => {
try{
    if(req.body.CodeCompleted){
         UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted: req.body.CodeCompleted})
         .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
            }    
            if(req.body.CodeCompleted2){
                 UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted2: req.body.CodeCompleted2})
                 .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })
                    }               if(req.body.CodeCompleted3){
                         UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted3: req.body.CodeCompleted3})
                         .then(update => {
                            res.status(200).json({
                                message: 'Clean update',
                                post: update
                            });
                        })
                            }               if(req.body.CodeCompleted4){
                                 UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted4: req.body.CodeCompleted4})
                                 .then(update => {
                                    res.status(200).json({
                                        message: 'Clean update',
                                        post: update
                                    });
                                })
                                    }               if(req.body.CodeCompleted5){
                                     UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted5: req.body.CodeCompleted5})
                                     .then(update => {
                                        res.status(200).json({
                                            message: 'Clean update',
                                            post: update
                                        });
                                    })
                                            }  
                                        }catch{
                                             res.status(500).json({
                                                message: "Invalid update error!",
                                            })
                                        
                                        }             
                                    }) 
                                    
router.patch("/infoEdComp1W", checkAuth,
    async(req, res, next) => {
          try{
        if(req.body.CodeCompleted6){
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted6: req.body.CodeCompleted6})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
       }  
                    if(req.body.CodeCompleted7){
            await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted7: req.body.CodeCompleted7})
            .then(update => {
                res.status(200).json({
                    message: 'Clean update',
                    post: update
                });
            })
            }       
                    if(req.body.CodeCompleted8){
              await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted8: req.body.CodeCompleted8})
              .then(update => {
                res.status(200).json({
                    message: 'Clean update',
                    post: update
                });
            })
                 }  
                              if(req.body.CodeCompleted9){
                          await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted9: req.body.CodeCompleted9})
                          .then(update => {
                            res.status(200).json({
                                message: 'Clean update',
                                post: update
                            });
                        })
       }              
        if(req.body.CodeCompleted10){
      await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted10: req.body.CodeCompleted10})
      .then(update => {
        res.status(200).json({
            message: 'Clean update',
            post: update
        });
    })
                            }     
                         } catch{
                            res.status(500).json({
                                message: 'Updating courses failed!'
                                 });
                               }
                             });

router.patch("/infoEdComp2", checkAuth,
 async(req, res, next) => {  
 if(reg.body){                                                          
 if(req.body.CodeCompleted11){
 await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted11: req.body.CodeCompleted11})
 .then(update => {
    res.status(200).json({
        message: 'Clean update',
        post: update
    });
})
 }              
if(req.body.CodeCompleted12){
 await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted12: req.body.CodeCompleted12})
 .then(update => {
    res.status(200).json({
        message: 'Clean update',
        post: update
    });
})
 }               
 if(req.body.CodeCompleted13){
 await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted13: req.body.CodeCompleted13})
 .then(update => {
    res.status(200).json({
        message: 'Clean update',
        post: update
    });
})
}               
if(req.body.CodeCompleted14){
await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted14: req.body.CodeCompleted14})
.then(update => {
    res.status(200).json({
        message: 'Clean update',
        post: update
    });
})
}              
 if(req.body.CodeCompleted15){
 await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted15: req.body.CodeCompleted15})
 .then(update => {
    res.status(200).json({
        message: 'Clean update',
        post: update
    });
})
}  
 } else {
    console.log('izzya')
res.status(501).json({
 message: 'Somethings funky!'
});
}      
});
router.patch("/infoEdComp2W", checkAuth,
 async(req, res, next) => {      
    try{
                                                                                                                            if(req.body.CodeCompleted16){
                                                                                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted16: req.body.CodeCompleted16})
                                                                                                                                .then(update => {
                                                                                                                                    res.status(200).json({
                                                                                                                                        message: 'Clean update',
                                                                                                                                        post: update
                                                                                                                                    });
                                                                                                                                })
                                                                                                                                    }               if(req.body.CodeCompleted17){
                                                                                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted17: req.body.CodeCompleted17})
                                                                                                                                        .then(update => {
                                                                                                                                            res.status(200).json({
                                                                                                                                                message: 'Clean update',
                                                                                                                                                post: update
                                                                                                                                            });
                                                                                                                                        })
                                                                                                                                            }               if(req.body.CodeCompleted18){
                                                                                                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted18: req.body.CodeCompleted18})
                                                                                                                                                .then(update => {
                                                                                                                                                    res.status(200).json({
                                                                                                                                                        message: 'Clean update',
                                                                                                                                                        post: update
                                                                                                                                                    });
                                                                                                                                                })
                                                                                                                                                    }               if(req.body.CodeCompleted19){
                                                                                                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted19: req.body.CodeCompleted19})
                                                                                                                                                        .then(update => {
                                                                                                                                                            res.status(200).json({
                                                                                                                                                                message: 'Clean update',
                                                                                                                                                                post: update
                                                                                                                                                            });
                                                                                                                                                        })
                                                                                                                                                            }               if(req.body.CodeCompleted20){
                                                                                                                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted20: req.body.CodeCompleted20})
                                                                                                                                                                .then(update => {
                                                                                                                                                                    res.status(200).json({
                                                                                                                                                                        message: 'Clean update',
                                                                                                                                                                        post: update
                                                                                                                                                                    });
                                                                                                                                                                })
                                                                                                                                                                    }  
                                                                                                                                                                } catch{
                                                                                                                                                                    res.status(500).json({
                                                                                                                                                                        message: 'Updating courses failed!'
                                                                                                                                                                    });
                                                                                                                                                                }     
                                                                                                                                                                });
                                                                                                                                                                router.patch("/infoEdComp3", checkAuth,
                                                                                                                                                                async(req, res, next) => {  
                                                                                                                                                                    try{
                                                                                                                                                                    if(req.body.CodeCompleted21){
                                                                                                                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted21: req.body.CodeCompleted21})
                                                                                                                                                                        .then(update => {
                                                                                                                                                                            res.status(200).json({
                                                                                                                                                                                message: 'Clean update',
                                                                                                                                                                                post: update
                                                                                                                                                                            });
                                                                                                                                                                        })
                                                                                                                                                                            }               if(req.body.CodeCompleted22){
                                                                                                                                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted22: req.body.CodeCompleted22})
                                                                                                                                                                                .then(update => {
                                                                                                                                                                                    res.status(200).json({
                                                                                                                                                                                        message: 'Clean update',
                                                                                                                                                                                        post: update
                                                                                                                                                                                    });
                                                                                                                                                                                })
                                                                                                                                                                                    }               if(req.body.CodeCompleted23){
                                                                                                                                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted23: req.body.CodeCompleted23})
                                                                                                                                                                                        .then(update => {
                                                                                                                                                                                            res.status(200).json({
                                                                                                                                                                                                message: 'Clean update',
                                                                                                                                                                                                post: update
                                                                                                                                                                                            });
                                                                                                                                                                                        })
                                                                                                                                                                                            }               if(req.body.CodeCompleted24){
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted24: req.body.CodeCompleted24})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })
            }               if(req.body.CodeCompleted25){
                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted25: req.body.CodeCompleted25})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })
                    }   
                } catch {
                    res.status(500).json({
                        message: 'Updating courses failed!'
                    });
                }
                })
                router.patch("/infoEdComp3W", checkAuth,
 async(req, res, next) => {  
    try{
                    if(req.body.CodeCompleted26){
                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted26: req.body.CodeCompleted26})
                        .then(update => {
                            res.status(200).json({
                                message: 'Clean update',
                                post: update
                            });
                        })
                            }               if(req.body.CodeCompleted27){
                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted27: req.body.CodeCompleted27})
                                .then(update => {
                                    res.status(200).json({
                                        message: 'Clean update',
                                        post: update
                                    });
                                })
                                    }               if(req.body.CodeCompleted28){
                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted28: req.body.CodeCompleted28})
                                        .then(update => {
                                            res.status(200).json({
                                                message: 'Clean update',
                                                post: update
                                            });
                                        })
                                            }               if(req.body.CodeCompleted29){
                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted29: req.body.CodeCompleted29})
                                                .then(update => {
                                                    res.status(200).json({
                                                        message: 'Clean update',
                                                        post: update
                                                    });
                                                })
                                                    }     if(req.body.CodeCompleted30){
                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted30: req.body.CodeCompleted30})
                                                        .then(update => {
                                                            res.status(200).json({
                                                                message: 'Clean update',
                                                                post: update
                                                            });
                                                        })
                                                            }   
                                                        } catch{
                                                            res.status(500).json({
                                                                message: 'Updating courses failed!'
                                                            });
                                                        }       
                                                        })
                                                        router.patch("/infoEdComp4", checkAuth,
 async(req, res, next) => {  
    try{
                                                            if(req.body.CodeCompleted31){
                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted31: req.body.CodeCompleted31})
                                                                .then(update => {
                                                                    res.status(200).json({
                                                                        message: 'Clean update',
                                                                        post: update
                                                                    });
                                                                })
                                                                    }               if(req.body.CodeCompleted32){
                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted32: req.body.CodeCompleted32})
                                                                        .then(update => {
                                                                            res.status(200).json({
                                                                                message: 'Clean update',
                                                                                post: update
                                                                            });
                                                                        })
                                                                            }               if(req.body.CodeCompleted33){
                                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted33: req.body.CodeCompleted33})
                                                                                .then(update => {
                                                                                    res.status(200).json({
                                                                                        message: 'Clean update',
                                                                                        post: update
                                                                                    });
                                                                                })
                                                                                    }               if(req.body.CodeCompleted34){
                                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted34: req.body.CodeCompleted34})
                                                                                        .then(update => {
                                                                                            res.status(200).json({
                                                                                                message: 'Clean update',
                                                                                                post: update
                                                                                            });
                                                                                        })
                                                                                            }   
                                                                                            if(req.body.CodeCompleted35){
                                                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted35: req.body.CodeCompleted35})
                                                                                                .then(update => {
                                                                                                    res.status(200).json({
                                                                                                        message: 'Clean update',
                                                                                                        post: update
                                                                                                    });
                                                                                                })
                                                                                                    }      
                                                                                                } catch{
                                                                                                    res.status(500).json({
                                                                                                        message: 'Updating courses failed!'
                                                                                                    });
                                                                                                }   
                                                                                                });
                                                                                                
                                                                                                router.patch("/infoEdComp4W", checkAuth,
 async(req, res, next) => {  
    try{
                                                                                                    if(req.body.CodeCompleted36){
                                                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted36: req.body.CodeCompleted36})
                                                                                                        .then(update => {
                                                                                                            res.status(200).json({
                                                                                                                message: 'Clean update',
                                                                                                                post: update
                                                                                                            });
                                                                                                        })
                                                                                                            }               if(req.body.CodeCompleted37){
                                                                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted37: req.body.CodeCompleted37})
                                                                                                                .then(update => {
                                                                                                                    res.status(200).json({
                                                                                                                        message: 'Clean update',
                                                                                                                        post: update
                                                                                                                    });
                                                                                                                })
                                                                                                                    }               if(req.body.CodeCompleted38){
                                                                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted38: req.body.CodeCompleted38})
                                                                                                                        .then(update => {
                                                                                                                            res.status(200).json({
                                                                                                                                message: 'Clean update',
                                                                                                                                post: update
                                                                                                                            });
                                                                                                                        })
                                                                                                                            }               if(req.body.CodeCompleted39){
                                                                                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted39: req.body.CodeCompleted39})
                                                                                                                                .then(update => {
                                                                                                                                    res.status(200).json({
                                                                                                                                        message: 'Clean update',
                                                                                                                                        post: update
                                                                                                                                    });
                                                                                                                                })
                                                                                                                                    }   
                                                                                                                                    if(req.body.CodeCompleted40){
                                                                                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted40: req.body.CodeCompleted40})
                                                                                                                                        .then(update => {
                                                                                                                                            res.status(200).json({
                                                                                                                                                message: 'Clean update',
                                                                                                                                                post: update
                                                                                                                                            });
                                                                                                                                        })
                                                                                                                                            }               if(req.body.CodeCompletedX){
                                                                                                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompletedX: req.body.CodeCompletedX})
                                                                                                                                                .then(update => {
                                                                                                                                                    res.status(200).json({
                                                                                                                                                        message: 'Clean update',
                                                                                                                                                        post: update
                                                                                                                                                    });
                                                                                                                                                })
                                                                                                                                                    } 
                                                                                                                                                } catch{
                                                                                                                                                    res.status(500).json({
                                                                                                                                                        message: 'Updating courses failed!'
                                                                                                                                                    });
                                                                                                                                                }
                                                                                                                                                })

                                                                                                                                                router.patch("/infoEdPur", checkAuth,
                                                                                                                                                        async(req, res, next) => {  
                                                                                                                                                            try{
                                                                                                                                    if(req.body.CodePursuing){
                                                                                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing: req.body.CodePursuing})
                                                                                                                                        .then(update => {
                                                                                                                                            res.status(200).json({
                                                                                                                                                message: 'Clean update',
                                                                                                                                                post: update
                                                                                                                                            });
                                                                                                                                        })
                                                                                                                                            }    
                                                                                                                                            if(req.body.CodePursuing2){
                                                                                                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing2: req.body.CodePursuing2})
                                                                                                                                                .then(update => {
                                                                                                                                                    res.status(200).json({
                                                                                                                                                        message: 'Clean update',
                                                                                                                                                        post: update
                                                                                                                                                    });
                                                                                                                                                })
                                                                                                                                                    }               if(req.body.CodePursuing3){
                                                                                                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing3: req.body.CodePursuing3})
                                                                                                                                                        .then(update => {
                                                                                                                                                            res.status(200).json({
                                                                                                                                                                message: 'Clean update',
                                                                                                                                                                post: update
                                                                                                                                                            });
                                                                                                                                                        })
                                                                                                                                                            }               if(req.body.CodePursuing4){
                                                                                                                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing4: req.body.CodePursuing4})
                                                                                                                                                                .then(update => {
                                                                                                                                                                    res.status(200).json({
                                                                                                                                                                        message: 'Clean update',
                                                                                                                                                                        post: update
                                                                                                                                                                    });
                                                                                                                                                                })
                                                                                                                                                                    }               if(req.body.CodePursuing5){
                                                                                                                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing5: req.body.CodePursuing5})
                                                                                                                                                                        .then(update => {
                                                                                                                                                                            res.status(200).json({
                                                                                                                                                                                message: 'Clean update',
                                                                                                                                                                                post: update
                                                                                                                                                                            });
                                                                                                                                                                        })
                                                                                                                                                                            } 
                                                                                                                                                                        } catch{
                                                                                                                                                                            res.status(500).json({
                                                                                                                                                                                message: 'Updating courses failed!'
                                                                                                                                                                            });
                                                                                                                                                                        }   
                                                                                                                                                                        })
                                                                                                                                                                        router.patch("/infoEdPurW", checkAuth,
                                                                                                                                                                        (req, res, next) => {  
                                                                                                                                                                          
                                                                                                                                                                            if(req.body.CodePursuing6){
                                                                                                                                                                                 UserInfo.updateOne({Creator:req.body.userId },{CodePursuing6: req.body.CodePursuing6})
                                                                                                                                                                                // .then(update => {
                                                                                                                                                                                //     res.status(200).json({
                                                                                                                                                                                //         message: 'Clean update',
                                                                                                                                                                                //         post: update
                                                                                                                                                                                //     });
                                                                                                                                                                                // })
                                                                                                                                                                                    }             
                                                                                                                                                                                      if(req.body.CodePursuing7){
                                                                                                                                                                                         UserInfo.updateOne({Creator:req.body.userId },{CodePursuing7: req.body.CodePursuing7})
                                                                                                                                                                                        // .then(update => {
                                                                                                                                                                                        //     res.status(200).json({
                                                                                                                                                                                        //         message: 'Clean update',
                                                                                                                                                                                        //         post: update
                                                                                                                                                                                        //     });
                                                                                                                                                                                        // })
                                                                                                                                                                                             }               
                                                                                                                                                                                    if(req.body.CodePursuing8){
                                                                                                                                                                                                 UserInfo.updateOne({Creator:req.body.userId },{CodePursuing8: req.body.CodePursuing8})
                                                                                                                                                                                                // .then(update => {
                                                                                                                                                                                                //     res.status(200).json({
                                                                                                                                                                                                //         message: 'Clean update',
                                                                                                                                                                                                //         post: update
                                                                                                                                                                                                //     });
                                                                                                                                                                                                // })
                                                                                                                                                                                                    }               if(req.body.CodePursuing9){
                                                                                                                                                                                                         UserInfo.updateOne({Creator:req.body.userId },{CodePursuing9: req.body.CodePursuing9})
                                                                                                                                                                                                        // .then(update => {
                                                                                                                                                                                                        //     res.status(200).json({
                                                                                                                                                                                                        //         message: 'Clean update',
                                                                                                                                                                                                        //         post: update
                                                                                                                                                                                                        //     });
                                                                                                                                                                                                        // })
                                                                                                                                                                                                            }               if(req.body.CodePursuing10){
                                                                                                                                                                                                                 UserInfo.updateOne({Creator:req.body.userId },{CodePursuing10: req.body.CodePursuing10})
                                                                                                                                                                                                                // .then(update => {
                                                                                                                                                                                                                //     res.status(200).json({
                                                                                                                                                                                                                //         message: 'Clean update',
                                                                                                                                                                                                                //         post: update
                                                                                                                                                                                                                //     });
                                                                                                                                                                                                                // })
                                                                                                                                                                                                                    }      
                                                                                                                                                                                                               
                                                                                                                                                                                                                })
                                                                                                                                                                                                                router.patch("/infoEdPurSpring", checkAuth,
                                                                                                                                                                                                                async(req, res, next) => {  
                                                                                                                                                                                                                    try{
                                                                                                                                                                                                                    if(req.body.CodePursuing11){
                                                                                                                                                                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing11: req.body.CodePursuing11})
                                                                                                                                                                                                                        .then(update => {
                                                                                                                                                                                                                            res.status(200).json({
                                                                                                                                                                                                                                message: 'Clean update',
                                                                                                                                                                                                                                post: update
                                                                                                                                                                                                                            });
                                                                                                                                                                                                                        })
                                                                                                                                                                                                                            }               if(req.body.CodePursuing12){
                                                                                                                                                                                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing12: req.body.CodePursuing12})
                                                                                                                                                                                                                                .then(update => {
                                                                                                                                                                                                                                    res.status(200).json({
                                                                                                                                                                                                                                        message: 'Clean update',
                                                                                                                                                                                                                                        post: update
                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                })
                                                                                                                                                                                                                            }     
                                                                                                                                                                                                                        } catch{
                                                                                                                                                                                                                            res.status(500).json({
                                                                                                                                                                                                                                message: 'Updating courses failed!'
                                                                                                                                                                                                                            });
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                        })
                                                                                                                                                                                                                        router.patch("/infoEdPurSummer", checkAuth,
                                                                                                                                                                                                                        async(req, res, next) => { 
                                                                                                                                                                                                                            try{ 
                                                                                                                                                                                                                            if(req.body.CodePursuing13){
await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing13: req.body.CodePursuing13})     
 .then(update => {
    res.status(200).json({
        message: 'Clean update',
        post: update
    });
})
}         if(req.body.CodePursuing14){
 await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing14: req.body.CodePursuing14})
 .then(update => {
    res.status(200).json({
        message: 'Clean update',
        post: update
    });
})
               }
            } catch{
                res.status(500).json({
                    message: 'Updating courses failed!'
                });
            }
            })



// userInfo recieving
router.get("/info", async(req, res) => {
    const counter = req.query.counter;
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
// Prfoile
router.get("/infoProfile", async(req, res) => {
    await UserInfo.find({Creator: req.query.userId})
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
     await UserInfo.findOne({Creator: req.query.userId})
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
router.post("/login1", verifyEmailV, async(req, res, next) => {
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
                        return res.status(401).json({
                            message: "Authentication failed "
                        });
                    }
                    console.log('verified')
                    fetchedUser = user;
                    return bcrypt.compare(req.body.passwordV, user.password)

                })
                .then(result => {
                    if (!result) {
                        return res.status(500).json({
                            message: "Authentication failed "
                        });
                    }
                    const token = jwt.sign(
                        { email: fetchedUser.email, userId: fetchedUser._id },
                        process.env.love,
                        { expiresIn: 25200 }
                    );
                    res.status(200).json({
                        token: token,
                        expiresIn: 25200,
                        userId: fetchedUser._id,
                        
                    });
                })
                .catch(err => {
                    return res.status(401).json({
                        message: "Invalid authentication credentials!",

                    })
                })
        } else {
            return res.status(500).json({
                message: "Non-validated account!",

            })
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
                process.env.love,
                { expiresIn: 25200 }
            );
            res.status(200).json({
                token: token,
                expiresIn: 25200,
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
router.post('/delete', async(req, res) => {
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
            await UserInfo.findOneAndDelete({username: username})
                }finally{
                    res.status(200).json({
                        message: 'Deleted Successful!',
                    })
                }
     
})

module.exports = router;