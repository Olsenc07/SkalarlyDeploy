const express = require('express');

const Post = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/post.js');


const router = express.Router()


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
router.post("", (req, res, next) => {
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
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully',
            postId: createdPost._id
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