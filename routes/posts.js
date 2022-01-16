const express = require('express');
const multer = require('multer');

const Post = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/post');


const router = express.Router()


const MIME_TYPE_MAP ={
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
};





const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid){
            error = null;
        }    
        cb(null, './backend/posts');   
  
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split('').join('-');
        // const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' );
    },
    
});

// Post recieving
router.get("", (req, res, next) => {
    Post.find().then(documents => {
    res.status(200).json({
        message: 'Posts fetched succesfully!',
        posts: documents
        });
    });
});

// Post additions
router.post("", multer({storage: storage}).single('upload'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        Title: req.body.Title,
        PostDescription: req.body.PostDescription,
        PostLocation: req.body.PostLocation,
        LocationEvent: req.body.LocationEvent,
        Time: req.body.Time,
        Date: req.body.Date,
        Gender: req.body.Gender,
        Driver: req.body.Driver,
        PaymentService: req.body.PaymentService,
        Virtual: req.body.Virtual,
        Event: req.body.Event,
        ImagePath: url + '/images/' + req.file
        
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully',
            post: {
                id: createdPost._id,
                ...createdPost,
                // Title: createdPost.Title,
                // PostDescription: createdPost.PostDescription,
                // PostLocation: createdPost.PostLocation,
                // LocationEvent: createdPost.LocationEvent,
                // Time: createdPost.Time,
                // Date: createdPost.Date,
                // Gender: createdPost.Gender,
                // Driver: createdPost.Driver,
                // PaymentService: createdPost.PaymentService,
                // Virtual: createdPost.Virtual,
                // Event: createdPost.Event,
                // ImagePath: createdPost.ImagePath

            } 
        });
    });
});

// Posts deleting
router.delete("/api/posts/:id", (req, res, next ) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: 'Post deleted!!'});
    });   
});



module.exports = router;