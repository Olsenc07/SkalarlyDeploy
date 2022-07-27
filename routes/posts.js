const express = require('express');
const multer = require('multer');

const Post = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/post');
const showCase = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/showCases');

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


// showCase recieving
router.get("/showCases", (req, res, next) => {
    showCase.find()
    .then(documents => {
    res.status(200).json({
        message: 'showCases fetched succesfully!',
        showCases: documents
        });
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