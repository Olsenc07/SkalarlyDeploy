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
const showCase = require('/app/backend/models/showCases');
const Post = require('/app/backend/models/post');
const Comment = require('/app/backend/models/comment');
const Msg = require('/app/backend/models/messages')
const Follow = require('/app/backend/models/follow')
const BlockSkalar = require('/app/backend/models/block-skalar')

const cloudinary = require('cloudinary').v2
// cloudinary
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret,
    // Untag when https
    secure: true
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




// checked blocked on profile page
router.get("/checkBlocked", async(req, res) => {
let UserID = req.query.userId;
console.log('UserID', UserID);
let id = req.query.id;
console.log('id', id);



    await User.findOne({_id: UserID})
    .then(found => {

        UserInfo.findOne({username: id})
        .then(viewing => {
            if(viewing){
        console.log('user 69', found);
        console.log('viewing', viewing);''
            BlockSkalar.findOne({ $and:[
                {Creator:viewing.Creator},{blockedUsername: found.username}
            ]})
            .then(blocked => {
                if(blocked){
                    res.status(200).json({
                        message: 'Blocked',
                        payload: true
                    });
                }else{
                    res.status(200).json({
                        message: 'Not Blocked',
                        payload: false
                    });
                }
            }).catch(err => {
                return res.status(401).json({
                    message: "Can't find blocked list",
            
                })
            })
        }else{
            return res.status(401).json({
                message: "This is not a valid account!",
        
            })
        }
        }).catch(err => {
            return res.status(401).json({
                message: "Can't find skalar",
        
            })
        })

        })
        
})


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
                Please copy and paste the link below to verify your account. Then return to the original page and continue to login.
                https://www.skalarly.com/api/user/verify-email?token=${user.emailToken}`,
                html:`
                <html fxLayout="column" fxLayoutAlign="center center">
                <h2 style="font-family:'Cormorant Garamond'; 
                font-size: large;
                ">We are excited to welcome you ${user.username} to the community!</h2>
                <div style="font-family:'Cormorant Garamond';
                font-size: medium;"> Please click the link below to verify your account. Then return to the original page and continue to login. </div>
             
                <a href="https://www.skalarly.com/api/user/verify-email?token=${user.emailToken}">Verify Email</a>
               
                <div style="font-family:'Cormorant Garamond';
                font-size: small;
                ">If you have recieved this email by erorr, please disregard. </div>
                </html>
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
            // Isnt working to redirect 
            return res.redirect(200,'https://www.skalarly.com/verified')
            // res.status(200).json({
            //     message: 'Your account has been verified. Please return to the previous page to continue.',
            // })
           
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
                    res.status(401).json({
                        message: 'Please check your email to verify your account.',
                    })
                }
            })
            .catch(err => {
                console.log('what up homie??')
                return res.status(401)
                });

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
        if (test) {
            await User.findOne({ email: req.body.emailV }).then(user => {
                if (user.isVerified === 'true') {
                    next()

                } else {
                    console.log('Please check your email to verify your account.')
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
         await User.findOne({email: req.body.email})
        .then((found) => {
            if(found){
                try{
            let founded = found.email;
            User.findOne({id: req.body.id})
            .then((vertigo) => {
                if(founded = vertigo.email){
                    //    Check users existence
        const msg = {
            from: ' "Reset Password" <admin@skalarly.com>',
            to: founded,
            replyTo: 'Do not reply',
            subject: 'Skalarly - reset password',
            text: `Hello ${vertigo.username} we hear you forgot your password.
        Here is your reset code ${vertigo.password} 
        If you have recieved this email by erorr, please disregard.
        `,
            html: `
            <html fxLayout="column" fxLayoutAlign="center center">
        <h2 style="font-family:'Cinzel'; 
        font-size: large;
        ">Hello ${vertigo.username} we hear you forgot your password.</h2>
        <div style="font-family:'Cormorant Garamond';
        font-size: medium;"> Here is your reset code. Copy this and keep it a secret! </div>
        ${vertigo.password}
        <div style="font-family:'Cormorant Garamond';
        font-size: small;
        ">If you have recieved this email by erorr, please disregard. </div>
        </html>

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
                    console.log('danny is a cutie');
                }else{
                    res.status(500).json({
                        message: 'This email is not yours.'
                    })
                }
            });
        }catch {
            res.status(500).json({
                message: 'This email does not exist.'
            })  
        }
        }  else{
            res.status(501).json({
                message: 'This email does not exist, or is not yours.'
            })
        }
        }).catch(err => {
            return res.status(401).json({
                message: "Email not found.",
        
            })
        })
       
    

})



// forgot password
router.post('/forgoted', async (req, res) => {
    await User.findOne({email: req.body.email})
   .then((found) => {
       if(found){
           try{
       let founded = found.email;
               //    Check users existence
   const msg = {
       from: ' "Reset Password" <admin@skalarly.com>',
       to: founded,
       replyTo: 'Do not reply',
       subject: 'Skalarly - reset password',
       text: `Hello ${found.username} we hear you forgot your password.
   Here is your reset code ${found.password} 
   If you have recieved this email by erorr, please disregard.
   `,
       html: `
       <html fxLayout="column" fxLayoutAlign="center center">
   <h2 style="font-family:'Cormorant Garamond'; 
   font-size: large;
   ">Hello ${found.username} we hear you forgot your password.</h2>
   <div style="font-family:'Cormorant Garamond';
   font-size: medium;"> Here is your reset code. Copy this and keep it a secret! </div>
   ${found.password}
   <div style="font-family:'Cormorant Garamond';
   font-size: small;
   ">If you have recieved this email by erorr, please disregard. </div>
   </html>
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
               console.log('danny is a cutie');
          
   }catch {
       res.status(500).json({
           message: 'This email does not exist.'
       })  
   }
   }  else{
       res.status(501).json({
           message: 'This email does not exist, or is not yours.'
       })
   }
   }).catch(err => {
       return res.status(401).json({
           message: "Email not found.",
   
       })
   })
  


})
// get reset code
router.post('/code', async (req, res) => {
    await User.findOne({email: req.body.email})
   .then((found) => {
       if(found){
           try{
       let founded = found.email;
               //    Check users existence
   const msg = {
       from: ' "Reset Password" <admin@skalarly.com>',
       to: founded,
       replyTo: 'Do not reply',
       subject: 'Skalarly - reset password',
       text: `Hello ${found.username} we hear you want to delete your account.
   Here is your code ${found.password} 
   If you have recieved this email by erorr, please disregard.
   `,
       html: `
       <html fxLayout="column" fxLayoutAlign="center center">
   <h2 style="font-family:'Cinzel'; 
   font-size: large;
   ">Hello ${found.username} we hear you want to delete your account.</h2>
   <div style="font-family:'Poppins';
   font-size: medium;"> Here is your reset code. Copy this and keep it a secret! </div>
   ${found.password}
   <div style="font-family:'Poppins';
   font-size: small;
   ">If you have recieved this email by erorr, please disregard. </div>
   </html>
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
               console.log('danny is a cutie');
          
   }catch {
       res.status(500).json({
           message: 'This email does not exist.'
       })  
   }
   }  else{
       res.status(501).json({
           message: 'This email does not exist, or is not yours.'
       })
   }
   }).catch(err => {
       return res.status(401).json({
           message: "Email not found.",
   
       })
   })
  


})

// router.get('/reset-password', async (req, res, next) => {
 
//         res.redirect('/resetPassword')
        
//         res.status(200)
//         console.log('Reset password redirect!')
        
        // const token = req.query.token;
        // const user = await User.findOne( {password: token});

        // Check if id exists in database
        // if (user){
        //     res.redirect('/resetPassword')
        // }

// })

router.post('/reset-password', async (req, res, next) => {
        const secretCode = await User.findOne({ password: req.body.secretCode })
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
            transformation: [
            {aspect_ratio: "1.0", width: 170, height: 170, 
            gravity: "face", crop: "lfill", radius: "max"},
        ],
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
    }).catch(error => {
        res.status(500).json({
            message: 'Getting info failed!'
        });
    })
    });
        // edit Name
router.patch("/infoName", checkAuth,
async(req, res, next) => {
        await UserInfo.updateOne({Creator:req.body.userId },{name: ''}) 
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        }).catch(error => {
            res.status(500).json({
                message: 'Updating name failed!'
            });
        });
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating bio failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating major failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating minor failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating club failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating sport failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
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
        }).catch(error => {
            res.status(500).json({
                message: 'Updating course failed!'
            });
        })
})

// edit info
const pic_ = multer({ storage: storage2, limits})
router.put("/infoEdPic", checkAuth,
    pic_.single('profilePic'),
    async(req, res, next) => {
                if(req.file){
                    await cloudinary.uploader.upload(req.file.path, {
                        transformation: [
                            {aspect_ratio: "1.0", width: 170, height: 170, 
                            gravity: "face", crop: "lfill", radius: "max"},
                        ],
                    folder:'ProfilePics'
                 })
                 .then(result => {
                 UserInfo.updateOne({Creator: req.body.userId },
                       { $set: {
                        ProfilePicPath: result.secure_url, 
                        cloudinary_id: result.public_id
                    }
                    })  
                .then(results => {
                            res.status(200).json({
                                message: 'Clean update',
                                post: results
                            });
                        }).catch(error => {
                            res.status(500).json({
                                message: 'Updating pic failed!!'
                            });
                        })
                        }).catch(error => {
                            res.status(500).json({
                                message: 'Updating picture failed!'
                            });
                        })}
                    else{
                        res.status(500).json({
                            message: 'Broken update',
                        })
                    }});
router.put("/infoEdName", checkAuth,
async(req, res, next) => {    
             if(req.body.name){
                await UserInfo.updateOne({Creator: req.body.userId },{name: req.body.name})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'Updating name failed!'
                    });
                })}})
router.put("/infoEdBio", checkAuth,
async(req, res, next) => { 
                 if(req.body.bio){
                    await  UserInfo.updateOne({Creator:req.body.userId },{bio: req.body.bio})
                    .then(update => {
                        res.status(200).json({
                            message: 'Clean update',
                            post: update
                        });
                    })
                    .catch(error => {
                        res.status(500).json({
                            message: 'Updating course failed!'
                        });
                    })}})
router.put("/infoEdBirthday", checkAuth,
async(req, res, next) => {
            if(req.body.birthday){
                await UserInfo.updateOne({Creator:req.body.userId },{birthday: req.body.birthday})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                }).catch(error => {
                    res.status(500).json({
                        message: 'Updating course failed!'
                    });
                })
            }})
router.put("/infoEdGender", checkAuth,
async(req, res, next) => {              
            if(req.body.gender){
                await UserInfo.updateOne({Creator:req.body.userId },{gender: req.body.gender})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })}})
router.put("/infoEdPronoun", checkAuth,
async(req, res, next) => {   

             if(req.body.pronoun){
                await UserInfo.updateOne({Creator:req.body.userId },{pronouns: req.body.pronoun})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })}})
router.put("/infoEdMajor", checkAuth,
async(req, res, next) => {        
            if(req.body.major){
                await UserInfo.updateOne({Creator:req.body.userId },{major: req.body.major})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })}}) 
router.put("/infoEdMinor", checkAuth,
async(req, res, next) => {   
             if(req.body.minor){
                await UserInfo.updateOne({Creator:req.body.userId },{minor: req.body.minor})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })}})
router.put("/infoEdSport", checkAuth,
async(req, res, next) => {    
             if(req.body.sport){
                await UserInfo.updateOne({Creator:req.body.userId },{sport: req.body.sport})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })}})
router.put("/infoEdClub", checkAuth,
async(req, res, next) => {     
            if(req.body.club){
                await UserInfo.updateOne({Creator:req.body.userId },{club: req.body.club})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })}})
                       
            
  
    router.put("/infoEdComp1", 
    checkAuth,
    (req, res, next) => {
    if(req.body.CodeCompleted){
         UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted: req.body.CodeCompleted})
         .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })}})   
        router.put("/infoEdComp2", 
        checkAuth,
        (req, res, next) => {
            if(req.body.CodeCompleted2){
                 UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted2: req.body.CodeCompleted2})
                 .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })}})
        router.put("/infoEdComp3", 
        checkAuth,
        (req, res, next) => {
        if(req.body.CodeCompleted3){
                         UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted3: req.body.CodeCompleted3})
                         .then(update => {
                            res.status(200).json({
                                message: 'Clean update',
                                post: update
                            });
                            })}})
           router.put("/infoEdComp4", 
        checkAuth,
        (req, res, next) => {                   
         if(req.body.CodeCompleted4){
        UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted4: req.body.CodeCompleted4})
         .then(update => {
                res.status(200).json({
                                        message: 'Clean update',
                                        post: update
                                    });
                                    })}})
         router.put("/infoEdComp5", checkAuth,
           (req, res, next) => {
           if(req.body.CodeCompleted5){
                                     UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted5: req.body.CodeCompleted5})
                                     .then(update => {
                                        res.status(200).json({
                                            message: 'Clean update',
                                            post: update
                                        });
                                            })}})  
                                                                                                                   
router.put("/infoEdComp6", checkAuth,
    async(req, res, next) => {
        if(req.body.CodeCompleted6){
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted6: req.body.CodeCompleted6})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })}})  
       router.put("/infoEdComp7", checkAuth,
    async(req, res, next) => { 
                    if(req.body.CodeCompleted7){
            await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted7: req.body.CodeCompleted7})
            .then(update => {
                res.status(200).json({
                    message: 'Clean update',
                    post: update
                });
            })}})    
            router.put("/infoEdComp8", checkAuth,
    async(req, res, next) => {    
                    if(req.body.CodeCompleted8){
              await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted8: req.body.CodeCompleted8})
              .then(update => {
                res.status(200).json({
                    message: 'Clean update',
                    post: update
                });
            })}}) 
                 router.put("/infoEdComp9", checkAuth,
    async(req, res, next) => {  
                              if(req.body.CodeCompleted9){
                          await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted9: req.body.CodeCompleted9})
                          .then(update => {
                            res.status(200).json({
                                message: 'Clean update',
                                post: update
                            });
                        })}})  
       router.put("/infoEdComp10", checkAuth,
    async(req, res, next) => {             
        if(req.body.CodeCompleted10){
      await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted10: req.body.CodeCompleted10})
      .then(update => {
        res.status(200).json({
            message: 'Clean update',
            post: update
        });
    })}})      

router.put("/infoEdComp11", checkAuth,
 async(req, res, next) => {                                                   
 if(req.body.CodeCompleted11){
 await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted11: req.body.CodeCompleted11})
 .then(update => {
    res.status(200).json({
        message: 'Clean update',
        post: update
    });
})}})
router.put("/infoEdComp12", checkAuth,
 async(req, res, next) => {                 
if(req.body.CodeCompleted12){
 await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted12: req.body.CodeCompleted12})
 .then(update => {
    res.status(200).json({
        message: 'Clean update',
        post: update
    });
})}}) 
 router.put("/infoEdComp13", checkAuth,
 async(req, res, next) => {               
 if(req.body.CodeCompleted13){
 await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted13: req.body.CodeCompleted13})
 .then(update => {
    res.status(200).json({
        message: 'Clean update',
        post: update
    });
})}}) 
router.put("/infoEdComp14", checkAuth,
 async(req, res, next) => {               
if(req.body.CodeCompleted14){
await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted14: req.body.CodeCompleted14})
.then(update => {
    res.status(200).json({
        message: 'Clean update',
        post: update
    });
})}}) 
router.put("/infoEdComp15", checkAuth,
 async(req, res, next) => {              
 if(req.body.CodeCompleted15){
 await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted15: req.body.CodeCompleted15})
 .then(update => {
    res.status(200).json({
        message: 'Clean update',
        post: update
    });
})}});
router.put("/infoEdComp16", checkAuth,
 async(req, res, next) => {      
    if(req.body.CodeCompleted16){
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted16: req.body.CodeCompleted16})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })}});
router.put("/infoEdComp17", checkAuth,
async(req, res, next) => { 
    if(req.body.CodeCompleted17){
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted17: req.body.CodeCompleted17})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })}});
router.put("/infoEdComp18", checkAuth,
async(req, res, next) => { 
    if(req.body.CodeCompleted18){
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted18: req.body.CodeCompleted18})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })}}); 
        router.put("/infoEdComp19", checkAuth,
        async(req, res, next) => {                                                                                                                                          
            if(req.body.CodeCompleted19){
                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted19: req.body.CodeCompleted19})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })}});                                                                                                                                                 
                router.put("/infoEdComp20", checkAuth,
                async(req, res, next) => {                                                                                                                                          
                    if(req.body.CodeCompleted20){
                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted20: req.body.CodeCompleted20})
                        .then(update => {
                            res.status(200).json({
                                message: 'Clean update',
                                post: update
                            });
                        })}});                                                                                                                                                                
                        router.put("/infoEdComp21", checkAuth,
                        async(req, res, next) => {  
                            if(req.body.CodeCompleted21){
                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted21: req.body.CodeCompleted21})
                                .then(update => {
                                    res.status(200).json({
                                        message: 'Clean update',
                                        post: update
                                    });
                                })}});
                        router.put("/infoEdComp22", checkAuth,
                                async(req, res, next) => {  
                                    if(req.body.CodeCompleted22){
                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted22: req.body.CodeCompleted22})
                                        .then(update => {
                                            res.status(200).json({
                                                message: 'Clean update',
                                                post: update
                                            });
                                        })}}); 
                        router.put("/infoEdComp23", checkAuth,
                                async(req, res, next) => {                                                                                                                                                
                                if(req.body.CodeCompleted23){
                                    await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted23: req.body.CodeCompleted23})
                                         .then(update => {
                                         res.status(200).json({
                                                    message: 'Clean update',
                                                    post: update
                                                });
                                            })}});
       router.put("/infoEdComp24", checkAuth,
            async(req, res, next) => {                                                                                                                                                                          if(req.body.CodeCompleted24){
        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted24: req.body.CodeCompleted24})
        .then(update => {
            res.status(200).json({
                message: 'Clean update',
                post: update
            });
        })}});
        router.put("/infoEdComp25", checkAuth,
            async(req, res, next) => {              
         if(req.body.CodeCompleted25){
                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted25: req.body.CodeCompleted25})
                .then(update => {
                    res.status(200).json({
                        message: 'Clean update',
                        post: update
                    });
                })}});   
            
                router.put("/infoEdComp26", checkAuth,
 async(req, res, next) => {  
                    if(req.body.CodeCompleted26){
                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted26: req.body.CodeCompleted26})
                        .then(update => {
                            res.status(200).json({
                                message: 'Clean update',
                                post: update
                            });
                        })}});
                        router.put("/infoEdComp27", checkAuth,
                        async(req, res, next) => {
                                        if(req.body.CodeCompleted27){
                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted27: req.body.CodeCompleted27})
                                .then(update => {
                                    res.status(200).json({
                                        message: 'Clean update',
                                        post: update
                                    });
                                })}});                
                                router.put("/infoEdComp28", checkAuth,
                                async(req, res, next) => {
                                if(req.body.CodeCompleted28){
                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted28: req.body.CodeCompleted28})
                                        .then(update => {
                                            res.status(200).json({
                                                message: 'Clean update',
                                                post: update
                                            });
                                        })}});
                                        router.put("/infoEdComp29", checkAuth,
                                        async(req, res, next) => {
                                                   if(req.body.CodeCompleted29){
                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted29: req.body.CodeCompleted29})
                                                .then(update => {
                                                    res.status(200).json({
                                                        message: 'Clean update',
                                                        post: update
                                                    });
                                                })}});   
                                                router.put("/infoEdComp30", checkAuth,
                                                async(req, res, next) => {  
                                                if(req.body.CodeCompleted30){
                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted30: req.body.CodeCompleted30})
                                                        .then(update => {
                                                            res.status(200).json({
                                                                message: 'Clean update',
                                                                post: update
                                                            });
                                                        })}});   
                               
router.put("/infoEdComp31", checkAuth,
 async(req, res, next) => {  
if(req.body.CodeCompleted31){
                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted31: req.body.CodeCompleted31})
                                                                .then(update => {
                                                                    res.status(200).json({
                                                                        message: 'Clean update',
                                                                        post: update
                                                                    });
                                                                })}});
                                                                router.put("/infoEdComp32", checkAuth,
 async(req, res, next) => {
                                                                               if(req.body.CodeCompleted32){
                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted32: req.body.CodeCompleted32})
                                                                        .then(update => {
                                                                            res.status(200).json({
                                                                                message: 'Clean update',
                                                                                post: update
                                                                            });
                                                                        })}});
                                                                        router.put("/infoEdComp33", checkAuth,
 async(req, res, next) => {
                                                                                       if(req.body.CodeCompleted33){
                                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted33: req.body.CodeCompleted33})
                                                                                .then(update => {
                                                                                    res.status(200).json({
                                                                                        message: 'Clean update',
                                                                                        post: update
                                                                                    });
                                                                                })}}); 
                                                                                router.put("/infoEdComp34", checkAuth,
 async(req, res, next) => {
                                                                                              if(req.body.CodeCompleted34){
                                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted34: req.body.CodeCompleted34})
                                                                                        .then(update => {
                                                                                            res.status(200).json({
                                                                                                message: 'Clean update',
                                                                                                post: update
                                                                                            });
                                                                                        })}});
                                                                                        router.put("/infoEdComp35", checkAuth,
 async(req, res, next) => {   
                                                                                            if(req.body.CodeCompleted35){
                                                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted35: req.body.CodeCompleted35})
                                                                                                .then(update => {
                                                                                                    res.status(200).json({
                                                                                                        message: 'Clean update',
                                                                                                        post: update
                                                                                                    });
                                                                                                })}});      
                                                                                                  
                                                                                   
                                                                                                
                                                                                                router.put("/infoEdComp36", checkAuth,
 async(req, res, next) => {  
                                                                                                    if(req.body.CodeCompleted36){
                                                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted36: req.body.CodeCompleted36})
                                                                                                        .then(update => {
                                                                                                            res.status(200).json({
                                                                                                                message: 'Clean update',
                                                                                                                post: update
                                                                                                            });
                                                                                                        })}}); 
                                                                                                        router.put("/infoEdComp37", checkAuth,
 async(req, res, next) => {            
                                                                                                          if(req.body.CodeCompleted37){
                                                                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted37: req.body.CodeCompleted37})
                                                                                                                .then(update => {
                                                                                                                    res.status(200).json({
                                                                                                                        message: 'Clean update',
                                                                                                                        post: update
                                                                                                                    });
                                                                                                                })}});
                                                                                                                router.put("/infoEdComp38", checkAuth,
 async(req, res, next) => {               
                                                                                                                if(req.body.CodeCompleted38){
                                                                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted38: req.body.CodeCompleted38})
                                                                                                                        .then(update => {
                                                                                                                            res.status(200).json({
                                                                                                                                message: 'Clean update',
                                                                                                                                post: update
                                                                                                                            });
                                                                                                                        })}});
                                                                                                                        router.put("/infoEdComp39", checkAuth,
 async(req, res, next) => {
                                                                                                                        if(req.body.CodeCompleted39){
                                                                                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted39: req.body.CodeCompleted39})
                                                                                                                                .then(update => {
                                                                                                                                    res.status(200).json({
                                                                                                                                        message: 'Clean update',
                                                                                                                                        post: update
                                                                                                                                    });
                                                                                                                                })}});
                                                                                                                                router.put("/infoEdComp40", checkAuth,
 async(req, res, next) => {   
                                                                                                                                    if(req.body.CodeCompleted40){
                                                                                                                                        await UserInfo.updateOne({Creator:req.body.userId },{CodeCompleted40: req.body.CodeCompleted40})
                                                                                                                                        .then(update => {
                                                                                                                                            res.status(200).json({
                                                                                                                                                message: 'Clean update',
                                                                                                                                                post: update
                                                                                                                                            });
                                                                                                                                        })}});               
                                                                                                                                        router.put("/infoEdCompX", checkAuth,
 async(req, res, next) => {
                                                                                                                                        if(req.body.CodeCompletedX){
                                                                                                                                                await UserInfo.updateOne({Creator:req.body.userId },{CodeCompletedX: req.body.CodeCompletedX})
                                                                                                                                                .then(update => {
                                                                                                                                                    res.status(200).json({
                                                                                                                                                        message: 'Clean update',
                                                                                                                                                        post: update
                                                                                                                                                    });
                                                                                                                                                })}}); 
                                                                                                                                               
                                                                                                                                            

router.put("/infoEdPur", checkAuth,
 async(req, res, next) => {                                                                                                                                                   
if(req.body.CodePursuing){
await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing: req.body.CodePursuing})
.then(update => {
res.status(200).json({
message: 'Clean update',
 post: update
});
})}});   
router.put("/infoEdPur2", checkAuth,
 async(req, res, next) => {                                                                                                                                                   
if(req.body.CodePursuing2){
await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing2: req.body.CodePursuing2})
.then(update => {
res.status(200).json({
message: 'Clean update',
 post: update
});
})}});                                                                                                                                                                                                                                                                                
router.put("/infoEdPur3", checkAuth,
 async(req, res, next) => {                                                                                                                                                   
if(req.body.CodePursuing3){
await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing3: req.body.CodePursuing3})
.then(update => {
res.status(200).json({
message: 'Clean update',
 post: update
});
})}});  
router.put("/infoEdPur4", checkAuth,
 async(req, res, next) => {                                                                                                                                                   
if(req.body.CodePursuing4){
await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing4: req.body.CodePursuing4})
.then(update => {
res.status(200).json({
message: 'Clean update',
 post: update
});
})}});  
router.put("/infoEdPur5", checkAuth,
 async(req, res, next) => {                                                                                                                                                   
if(req.body.CodePursuing5){
await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing5: req.body.CodePursuing5})
.then(update => {
res.status(200).json({
message: 'Clean update',
 post: update
});
})}});                                                                                                                                                                      
router.put("/infoEdPurW6", checkAuth,
(req, res, next) => {                                                          
if(req.body.CodePursuing6){
UserInfo.updateOne({Creator:req.body.userId },{CodePursuing6: req.body.CodePursuing6})
.then(update => {
res.status(200).json({
message: 'Clean update',
post: update });
})}});     
router.put("/infoEdPurW7", checkAuth,
(req, res, next) => {       
if(req.body.CodePursuing7){
    UserInfo.updateOne({Creator:req.body.userId },{CodePursuing7: req.body.CodePursuing7})
   .then(update => {
       res.status(200).json({
           message: 'Clean update',
           post: update
       });
   })}}) 
   router.put("/infoEdPurW8", checkAuth,
(req, res, next) => {                                                                                                                                                                                           
   if(req.body.CodePursuing8){
    UserInfo.updateOne({Creator:req.body.userId },{CodePursuing8: req.body.CodePursuing8})
   .then(update => {
       res.status(200).json({
           message: 'Clean update',
           post: update
       });
   })}})    
   router.put("/infoEdPurW9", checkAuth,
   (req, res, next) => {                                                                                                                                                                                                   
    if(req.body.CodePursuing9){
        UserInfo.updateOne({Creator:req.body.userId },{CodePursuing9: req.body.CodePursuing9})                                                                                                                                                                                              
     .then(update => {
         res.status(200).json({
             message: 'Clean update',
             post: update
         });
     })}})
     router.put("/infoEdPurW10", checkAuth,
     (req, res, next) => {                                                                                                                                                                                                   
      if(req.body.CodePursuing10){
          UserInfo.updateOne({Creator:req.body.userId },{CodePursuing10: req.body.CodePursuing10})                                                                                                                                                                                              
       .then(update => {
           res.status(200).json({
               message: 'Clean update',
               post: update
           });
       })}})                                                                                                                                                                                                                    
       router.put("/infoEdPurSpring11", checkAuth,
       async(req, res, next) => {  

           if(req.body.CodePursuing11){
               await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing11: req.body.CodePursuing11})
               .then(update => {
                   res.status(200).json({
                       message: 'Clean update',
                       post: update
                   });
               })
                   }})                                                                                                                                                                                                        
    router.put("/infoEdPurSpring12", checkAuth,
       async(req, res, next) => {  

           if(req.body.CodePursuing12){
               await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing12: req.body.CodePursuing12})
               .then(update => {
                   res.status(200).json({
                       message: 'Clean update',
                       post: update
                   });
               }).catch(error => {
                res.status(500).json({
                    message: 'Updating course failed!'
                });
            })}})                                                                                                                                                                                                             
                                                                                                                                                                                                                       
router.put("/infoEdPurSummer13", checkAuth,
  async(req, res, next) => { 
if(req.body.CodePursuing13){                                                                                                                                                                                                                    
await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing13: req.body.CodePursuing13})     
 .then(update => {
    res.status(200).json({
        message: 'Clean update',
        post: update
    });
}).catch(error => {
    res.status(500).json({
        message: 'Updating course failed!'
    });
})
}}) 
router.put("/infoEdPurSummer14", checkAuth,
  async(req, res, next) => {        
if(req.body.CodePursuing14){
 await UserInfo.updateOne({Creator:req.body.userId },{CodePursuing14: req.body.CodePursuing14})
 .then(update => {
    res.status(200).json({
        message: 'Clean update',
        post: update
    });
})}})    
// userInfo recieving
router.get("/info", async(req, res) => {
    const counter = req.query.counter;
    const userId = req.query.userId;

    console.log('userId',userId);
await User.findById({_id: userId})
.then(userOne => {
    console.log('userOne username', userOne.username);
     BlockSkalar.find({blockedUsername: userOne.username}).then(blocked => {
        console.log('blocked heart', blocked);
        if(blocked){
            blockedList = []
            blocked.forEach((e) => {
                blockedList.push(e.Creator.valueOf())
            })
            console.log('blockedList',blockedList);
     UserInfo.find({Creator: {$nin: blockedList}}).skip(counter).limit(6)
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
    }else{
        UserInfo.find().skip(counter).limit(6)
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
    }
})
})

  
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
router.get("/infoPersonal", async(req, res) => {
    console.log('log', req.query.userId)
     await UserInfo.find({Creator: req.query.userId})
    .then(infosData => {
    console.log('logs', infosData);
            res.status(200).json({
                message: 'Posts personal fetched succesfully!',
                infos: infosData
       });
       err => console.error(`Something went wrong: ${err}`);

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
                 User.findOneAndDelete( {email: reg.body.email})
                 .then(()=> {
                 res.status(401).json({
                    message: "Your account was not completed when it was made. Please make it again!"
                });
            })}
if(userInfo){
    User.findOne({ email: reg.body.email })
        .then(user => {
                fetchedUser = user;
                return bcrypt.compare(reg.body.password, user.password)
        })   
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Authentication failed"
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
router.get('/getusers', async (req, res) => {
    let payload = req.query.query;
    let userId = req.query.userId;
 
  await UserInfo.findOne({Creator: userId})
    .then(yourself => {
        BlockSkalar.find({blockedUsername: yourself.username})
        .then((blockedlist) => {
            if(blockedlist){
                console.log('blockedlist.blockedUsername', blockedlist.blockedUsername)
                UserInfo.find({ $and: [
                   { username: {
                        $regex: new RegExp('^' + payload ,
                            'i')
                    }},{username: {$ne: blockedlist.blockedUsername}}
                ]}).limit(7)
                .then((matches) => {
                    if(matches){
                    res.status(200).json({
                        message: 'Matches returned!',
                        payload: matches
                    });
                }else{
                    res.status(200).json({
                        message: 'No matches returned!',
                        payload: []
                    }); 
                }
                }) .catch(err => {
                    return res.status(401).json({
                        message: "Can't find skalars!",
            
                    });
                });
            }else{
                UserInfo.find({ 
                     username: {
                         $regex: new RegExp('^' + payload ,
                             'i')
                     }
                 }).limit(7)
                 .then((matches) => {
                     if(matches){
                     res.status(200).json({
                         message: 'Matches returned!',
                         payload: matches
                     });
                 }else{
                     res.status(200).json({
                         message: 'No matches returned!',
                         payload: []
                     }); 
                 }
                 }) .catch(err => {
                     return res.status(401).json({
                         message: "Can't find skalars!",
             
                     });
                 });
            }

        })
    }).catch(err => {
        return res.status(401).json({
            message: "Can't find skalar!",

        });
    });



     
});

// Search emails
router.get('/getEmails', async (req, res) => {
    let payload = req.query.query;
    console.log('payload 7',payload)
  await User.findOne({
        email: {
            $regex: new RegExp('^' + payload)
        }
    }).then((matches) => {
        if(matches){
        const payload_2 =  new RegExp(matches.email)

            console.log('goTime');
            const matchesPass = payload_2.test(payload);
            console.log('matchesPass', matchesPass)
            if(matchesPass === true){
                console.log('you did it')
                    res.status(200).json({
                        message: 'Match returned!',
                        payload: matchesPass
                    
                    });
                }else{
                    console.log('almost made it')
                    res.status(200).json({
                        message: 'No matches returned!',
                        payload: false
                    }); 
                }
        
    }else{
        console.log('not even close')

        res.status(200).json({
            message: 'No matches returned!',
            payload: false
        }); 
    }
    }) .catch(err => {
        return res.status(401).json({
            message: "Can't find email!",

        });
    });
})
// Search un used emails
router.get('/getUnUsedEmail', async (req, res) => {
    let payload = req.query.query;
    console.log('payload 7',payload)
  await User.findOne({
        email: {
            $regex: new RegExp('^' + payload)
        }
    }).then((matches) => {
      

        if(matches){
        const payload_2 =  new RegExp(matches.email)

            console.log('goTime');
            const matchesPass = payload_2.test(payload);
            console.log('matchesPass', matchesPass)
            if(matchesPass === true){
                console.log('you did it')
                    res.status(200).json({
                        message: 'Match returned!',
                        payload: matchesPass
                    
                    });
                }else{
                    console.log('almost made it')
                    res.status(200).json({
                        message: 'No matches returned!',
                        payload: false
                    }); 
                }
        
    }else{
        console.log('not even close')

        res.status(200).json({
            message: 'No matches returned!',
            payload: false
        }); 
    }
    }) .catch(err => {
        return res.status(401).json({
            message: "Can't find email!",

        });
    });
})
// Search usernames
router.get('/getUsernames', async (req, res) => {
    let payload = req.query.query;


// cant search if you blocked by that user
    
  await User.findOne({ 
        username: {
            $regex: new RegExp('^' + payload )
        }
    }).then((matches) => {
      

        if(matches){
        const payload_2 =  new RegExp(matches.username)
        console.log('goTime');
        const matchesPass = payload_2.test(payload);
        console.log('matchesPass', matchesPass)
        if(matchesPass === true){
            console.log('you did it')
        res.status(200).json({
            message: 'Match returned!',
            payload: matchesPass
        });
    }else{
        console.log('almost made it')
        res.status(200).json({
            message: 'No matches returned!',
            payload: false
        }); 
    }
    }else{
        res.status(200).json({
            message: 'No matches returned!',
            payload: false
        }); 
    }
    }) .catch(err => {
        return res.status(401).json({
            message: "Can't find username!",

        });
    });
})


// Search hashtags
router.get('/gethashs', async (req, res) => {
    let payload = req.query.queryHash;
    let matchesAll = [];
    console.log('Payload',payload);

     await Post.find({ $or: [
       { Hashtag1: {
            $regex: new RegExp('^' + payload)
        }},
       { Hashtag2: {
            $regex: new RegExp('^' + payload)
        }},
        {Hashtag3: {
            $regex: new RegExp('^' + payload)
        }},
        {Hashtag4: {
            $regex: new RegExp('^' + payload)
        }},
        {Hashtag5: {
            $regex: new RegExp('^' + payload)
        }}
     ]
    },{_id:0,Hashtag1:1, Hashtag2:1,Hashtag3:1,Hashtag4:1,Hashtag5:1}).limit(10).exec()
    .then(docs => {
           if(docs){
            console.log('docs',docs)
            const regex = new RegExp('.*' + payload + '.*',
                'i')
                m1 = []
                 docs.forEach((e) => { 
                    m1.push(e.Hashtag1) } )
                
                    let matches1 = m1.filter((e) => e.match(regex))
                    console.log('matches1', matches1);
                    // 2
                    m2 = []
                    docs.forEach((e) => { 
                       m2.push(e.Hashtag2) } )
                  
                       let matches2 = m2.filter((e) => e.match(regex))
                       console.log('matches2', matches2);
                    //    3
                       m3 = []
                       docs.forEach((e) => { 
                          m3.push(e.Hashtag3) } )
                      
                          let matches3 = m3.filter((e) => e.match(regex))
                          console.log('matches3',matches3);
                        //   4
                          m4 = []
                          docs.forEach((e) => { 
                             m4.push(e.Hashtag4) } )
                             
                             let matches4 = m4.filter((e) => e.match(regex))
                             console.log('matches4',matches4);
                            //  5
                             m5 = []
                             docs.forEach((e) => { 
                                m5.push(e.Hashtag5) } )
                        
                                let matches5 = m5.filter((e) => e.match(regex))
                                console.log('matches5', matches5);
    // do for other five and put results together
          matchesAll = []
          matchesAll.push(...matches1,...matches2,...matches3,...matches4,...matches5)
        //   then filter and cancel any repeats
        let finalMatches = [... new Set(matchesAll)]
          console.log('trying', matchesAll)
          console.log('filtered doubles', finalMatches);
          if(finalMatches){
            res.status(200).json({
                message: 'Matches returned!',
                payload: finalMatches
            });
        }else{
            res.status(200).json({
                message: 'No matches returned!',
                payload: []
            }); 
        }
            // res.send({ payload: finalMatches })

          
           }else{
            console.log('mac miller')
           }
      

    })




});
// Deleting account
router.post('/delete', async(req, res) => {
      let username
      let id
        let fetchedUser;
        await User.findOne({ email: req.body.emailDel })
        .then(user => {
            username = user.username;
            id = username._id
            console.log('id',id)
            if (!user) {
                return res.status(401).json({
                    message: "Authentication failed "
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.passwordDel, user.password)
        })
        .then(result => {
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
                console.log('code',req.body.code )
                 User.findOne({ password: req.body.code }).then((mint) => {
                        if(!mint){
                            return res.status(401).json({
                            message: "Invalid code"
                 })
                }
            })
                try{
            await UserInfo.findOne({username: username})
            .then(user => {
                cloudinary.uploader.destroy(user.cloudinary_id)
            })
            .catch(err => {
                return res.status(401).json({
                    message: "Invalid authentication credentials!!",

                });
            });
            await User.findOneAndDelete( {username: username}).then(() => {
                console.log('User deleted')
            })
            await UserInfo.findOneAndDelete({username: username}).then(() => {
                console.log('user Info deleted')
            })
            await Post.deleteMany({username: username}).then(() => {
                console.log('posts deleted')
            })
            await Follow.deleteMany({usernameFollower: username}).then(() => {
                console.log('Follower deleted')
            })
            await Follow.deleteMany({Following: username}).then(() => {
                console.log('Following deleted')
            })
            await Comment.deleteMany({username: username}).then(() => {
                console.log('Comment deleted')
            })
            await Msg.deleteMany({username: username}).then(() => {
                console.log('posts deleted')
            })
            await Msg.deleteMany({otherUser: username}).then(() => {
                console.log('Msgs deleted')
            })
            await showCase.find({Creator: id})
                        .then(result => {
                        console.log('meeee', result)
                 cloudinary.uploader.destroy(result.cloudinary_id)
                 .then(console.log('it worked'));
         
             })
            await showCase.deleteMany({Creator: id}).then(result => {
                if (result){
                res.status(200);
                console.log('it worked for showcases')
                } else {
                    res.status(401).json({message: 'Deletion error'});
                    console.log('it did not work')
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Fetching showCases failed!'
                });
            });
                }finally{
                    res.status(200).json({
                        message: 'Deleted Successful!',
                    })
                }   
})
 
module.exports = router;