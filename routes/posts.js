const express = require('express');
const multer = require('multer');

const Post = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/post');
const showCase = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/showCases');
const UserInfo = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/userInfo');

const checkAuth = require('/Users/chaseolsen/angular_scholarly_fs/backend/middleware/check-auth');

const router = express.Router();


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
        cb(null, './backend/posts');   
  
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase();
        // const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name );
            // + '-' + Date.now() + '.' + ext);
    },
    
});

const storage_2 = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(null, './backend/showCase');

    },
    filename: (req, file, cb) => {
        if (file) {
            const name = file.originalname.toLowerCase();
            // const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, name)
            // + '-' + Date.now() + '.' + ext);
        } else {
            console.log('No array of pics')
        }
    },

});

// Post recieving
router.get("", (req, res, next) => {
    Post.find()
    .then(documents => {
    res.status(200).json({
        message: 'Posts fetched succesfully!',
        posts: documents
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Fetching posts failed!'
        });
    });
});

// Post recieving Feed
router.get("/feed", (req, res, next) => {
     UserInfo.find()
    .then(docs => {
            console.log('doors unlock', docs)
            res.status(200).json({
                message: 'Posts personal fetched succesfully!',
                infos: docs
       });
    })  
    .catch(error => {
        res.status(500).json({
            message: 'Fetching personal posts failed!'
        });
    });
});

// Post recieving personal
router.get("/personal", async(req, res, next) => {
    await UserInfo.findOne({Creator: {$eq: req.query.userId}})
    .then(docs => {
        console.log('night light', docs.Creator)
        Post.find({Creator: docs.Creator})
       .then(doc => {
        console.log('doors unlock', doc)
        res.status(200).json({
            message: 'Posts personal fetched succesfully!',
            posts: doc
        });
       })
    })  
    .catch(error => {
        res.status(500).json({
            message: 'Fetching personal posts failed!'
        });
    });

});
const up = multer({ storage: storage})
// Post additions
router.post("", 
    checkAuth,
    up.single('upload'),
    (req, res) => {
        console.log('description',req.file)
    const url = req.protocol + '://' + req.get('host');
if (req.file){
    // up.single('upload')
    var post = new Post({
        Title: req.body.Title,
        postDescription: req.body.postDescription,
        postLocation: req.body.postLocation,
        LocationEvent: req.body.LocationEvent,
        time: req.body.time,
        date: req.body.date,
        gender: req.body.gender,
        driver: req.body.driver,
        paymentService: req.body.paymentService,
        virtual: req.body.virtual,
        event: req.body.event,
        ImagePath: url + '/posts/' + req.file.filename,
        Creator: req.userData.userId
    });
}else{
    var post = new Post({
        Title: req.body.Title,
        postDescription: req.body.postDescription,
        postLocation: req.body.postLocation,
        LocationEvent: req.body.LocationEvent,
        time: req.body.time,
        date: req.body.date,
        gender: req.body.gender,
        driver: req.body.driver,
        paymentService: req.body.paymentService,
        virtual: req.body.virtual,
        event: req.body.event,
        // ImagePath: url + '/posts/' + req.file,
        Creator: req.userData.userId
    });
}
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully',
            postId: {
                id: createdPost._id,
                ...createdPost
            } 
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Creating a post failed!'
        });
    });
});

// Posts deleting
router.delete("/:id", checkAuth, (req, res, next ) => {
    console.log('id params', req.params.id )
    Post.deleteOne({_id: req.params.id}).then(result => {
        if (result){
        res.status(200).json({message: 'Post deleted!!'});
        } else {
            res.status(401).json({message: 'Not authorized'});
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Fetching posts failed!'
        });
    });
});

// Comment on post
router.post('/comment', (req, res) =>{
    if (!req.body.comment){
        res
    }
})

// Get others posts
router.get("/otherUsers", async(req, res) => {
    console.log('BasketBall', req.query.id)
        await UserInfo.findOne({username: {$eq: req.query.id}})
        .then(docs => {
            console.log('night light', docs.Creator)
            Post.find({Creator: docs.Creator})
           .then(doc => {
            console.log('doors unlock', doc)
            res.status(200).json({
                message: 'Infos fetched succesfully!',
                posts: doc
            });
           })
        })  
        .catch(error => {
            res.status(500).json({
                message: 'Fetching posts failed!'
            });
        });

});

// Get others posts
router.get("/otherUsersInfos", async(req, res) => {
    console.log('BasketBall', req.query.id)
        await UserInfo.findOne({username: {$eq: req.query.id}})
        .then(docs => {
            console.log('doors unlocked twice', docs)
            res.status(200).json({
                message: 'Infos fetched succesfully!',
                infos: docs
            });
        })  
        .catch(error => {
            res.status(500).json({
                message: 'Fetching posts failed!'
            });
        });

});
// showCase recieving
router.get("/showCases", async(req, res, next) => {
    console.log('Sking', req.query.id)
        await UserInfo.findOne({username: {$eq: req.query.id}})
        .then(docs => {
            console.log('midnight light', docs)
            showCase.find({Creator: docs.Creator})
           .then(doc => {
            console.log('doors unlock', doc)
            res.status(200).json({
                message: 'Infos fetched succesfully!',
                showCases: doc
            });
           })
        })  
        .catch(error => {
            res.status(500).json({
                message: 'Fetching posts failed!'
            });
        });
});

// showCase recieving Personal
router.get("/showCasesPersonal", async(req, res, next) => {
    console.log('Kicking rocks', req.query.userId)
    await UserInfo.findOne({Creator: {$eq: req.query.userId}})
    .then(docs => {
        console.log('midnight light', docs)
        showCase.findOne({Creator: docs.Creator})
       .then(doc => {
        console.log('doors unlock', doc)
        res.status(200).json({
            message: 'Infos fetched succesfully!',
            showCases: doc
        });
       })
    })  
    .catch(error => {
        res.status(500).json({
            message: 'Fetching posts failed!'
        });
    });
});
const show = multer({ storage: storage_2})
// showCase additions
router.post("/showCases", 
    checkAuth,
    show.single('showCase'),
    (req, res) => {
    const url = req.protocol + '://' + req.get('host');

if (req.file){

        console.log('description',req.file)
    // up.single('upload')
    var ShowCase = new showCase({
    
        ShowCasePath: url + '/showCase/' + req.file.filename,
        Creator: req.userData.userId
    });
}else{
    console.log('description2')

    var ShowCase = new showCase({
    
        ShowCasePath: url + '/showCase/' + req.file,
        Creator: req.userData.userId
    });
 } ShowCase.save().then(createdPost => {
        res.status(201).json({
            message: 'showCase added successfully',
            postId: {
                id: createdPost._id,
                ...createdPost
            } 
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Creating a showCase failed!'
        });
    });
});

// showCase deleting
router.delete("/showCases/:id", checkAuth, (req, res, next ) => {
    console.log('id params', req.params.id )
    showCase.deleteOne({_id: req.params.id}).then(result => {
        if (result){
        res.status(200).json({message: 'showCase deleted!!'});
        } else {
            res.status(401).json({message: 'Not authorized'});
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Fetching showCases failed!'
        });
    });
});
module.exports = router;