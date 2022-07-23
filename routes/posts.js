const express = require('express');
const multer = require('multer');

const Post = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/post');
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

const up = multer({ storage: storage})
// Post additions
router.post("", 
    checkAuth,
    up.single('upload'), (req, res) => {
        console.log('description',req.body)
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        Title: req.body.Title,
        postDescription: req.body.postDescription,
        postLocation: req.body.postLocation,
        LocationEvent: req.body.LocationEvent,
        time: req.body.time,
        date: req.body.date,
        Gender: req.body.gender,
        Driver: req.body.driver,
        PaymentService: req.body.paymentService,
        Virtual: req.body.virtual,
        Event: req.body.event,
        ImagePath: url + '/posts/' + req.file.filename,
        Creator: req.userData.userId
    });
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
router.delete("/api/posts/:id", checkAuth, (req, res, next ) => {
    Post.deleteOne({_id: req.params.id, Creator: reg.userData.userId}).then(result => {
        if (result.n > 0){
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



module.exports = router;