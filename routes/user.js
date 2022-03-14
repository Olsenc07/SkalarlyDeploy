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
const user = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/user');



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
router.post("/signup", async(req, res, next) => {
try{
    const userEmail =  await User.findOne({ email: req.body.email});
    const userName =  await User.findOne({ userName: req.body.username});
    if(!(userEmail && userName)){
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                emailToken: crypto.randomBytes(64).toString('hex'),
                isVerified: false,
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
                    // res.status(500).json({
                    //         message: 'Email or Username invalid!'     
                    // });
                    res.redirect('/sign-up')
                    
                });
            const msg = {
                from:' "Verify account" <skalarly777@outlook.com>',
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
                if (error){
                    console.log(error)
                }
                else {
                    
                    console.log('Verification has been sent to email')
                }
                
            })

        });
    }else{
        res.status(500).json({
            message: 'Email or Username is taken',
        });
        console.log('Username or email is taken!')
    }
}finally{}
       
});

router.get('/verify-email', async(req, res, next) => {
    try {
        const token = req.query.token;
        const user =  await User.findOne({ emailToken: token});
        if (user) {
            user.emailToken = null;
            user.isVerified = true;
            await user.save()
            res.redirect('/verified')
        }else{
            res.redirect('/sign-up')
            console.log('error', 'Invalid authentication. Please try again.' );

        }
    //    Runs regardless of result
    }finally {

    }


})

const verifyEmail = async(req, res, next) => {
    try{
        const user = await User.findOne({ email: req.body.email})
        if(user.isVerified){
            next()
        }
        else{
            console.log('Please check email to verify your account.')
        }
    }
    catch(err){
        console.log(err)
    }
}
// Reset password
router.post('/forgot', async(req, res) => {
    try {
   const user = await User.findOne({email: req.body.email});
//    Check users existence
   if ( !user) {
      res.status(500).json({
          message: 'This email does not exist, or is not verified.'
      })
    }
    const msg = {
        from:' "Reset Password" <skalarly777@outlook.com>',
        to: user.email,
        subject: 'Skalarly - reset password',
        text: `Hello ${user.username} we hear you forgot your password.
        Here is your reset code ${user.password} then copy and paste the link below to navigate back
        http://${req.headers.host}/api/user/reset-password
        If you have recieved this email by erorr, please disregard.
        `,
        html: `
        <h2>Hello ${user.username} we hear you forgot your password.</h2>
        <div> Here is your reset code. Copy this and keep it a secret!! </div>
        ${user.password}
        <div> Now follow the below link </div>
       <a href="http://${req.headers.host}/api/user/reset-password">Follow link</a>
        <div>If you have recieved this email by erorr, please disregard. </div>
        `
    }
        // Sending mail
        transporter.sendMail(msg, (error, info) => {
            if (error){
                console.log(error)
            }
            else {
                
                console.log('Password reset has been sent to email')
            }
            
        })
} finally {}

})

router.get('/reset-password', async(req, res, next) => {
 try{
    res.redirect('/resetPassword')
    // const token = req.query.token;
    // const user = await User.findOne( {password: token});

// Check if id exists in database
// if (user){
//     res.redirect('/resetPassword')
// }


}finally {

}
})

router.post('/reset-password', async(req, res, next) => {
    try{
    const secretCode = await User.findOne({secretCode: req.body.secretCode} )
    if (secretCode){
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                User.updateOne({password: hash})
                .then(result => {
                    res.status(201).json({
                        message: 'Password changed successfully',
                        result: result
                    });
            })
        })
        console.log('Password changed successfully');
        }
    }finally{
        // console.log('Complete')
    }
})



  



// User info
const pic = multer({ storage: storage});
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
    UserInfo.find()
    // .select('-password') if i was fetching user info, dont want password passed on front end
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



// userInfo for going to others profile pages
router.post("/info/:id", async(req, res, next) => {

    const id = await UserInfo.findOne({id: req.body.id});
    const ID = id._id

res.redirect('http://localhost:3000/api/user/otherInfo/' + req.body.id)
   console.log(req.body.id)
   console.log(ID, 'wally')
   console.log('http://localhost:3000/api/user/otherInfo/' + req.body.id)

});

// Redirected from the postinfo page load
router.get("/otherInfo/:id", (req, res, next) => {
// const id = req.params.id;
    const Id = req.params.id;
        console.log(Id, 'donkey');
        // window.location.href = 'profile/:id';


        // Breaking point
        res.redirect('http://localhost:3000/login')
   
 

})
// Triggered on profile/:id info page load and actually gives the page the info
router.get("/onOtherProfile", async(req, res, next) => {
       await UserInfo.find()
        // .select('-password') if i was fetching user info, dont want password passed on front end
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
    })


// Login
router.post("/login", verifyEmail, (reg, res, next) => {
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
                message: "Invalid authentication credentials!",

            });
        });
});

module.exports = router;