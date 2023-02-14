const express = require('express');
const multer = require('multer');
const Post = require('/app/backend/models/post');
const showCase = require('/app/backend/models/showCases');
const Subscription = require('/app/backend/models/subscription');
const UserInfo = require('/app/backend/models/userInfo');
const Comment = require('/app/backend/models/comment');
const Follow = require('/app/backend/models/follow')
const Msg = require('/app/backend/models/messages')
const missedHistory = require('/app/backend/models/missed-notification');


const webpush = require('web-push');
const cloudinary = require('cloudinary').v2
const checkAuth = require('/app/backend/middleware/check-auth');
const router = express.Router();
publicVapidKey = process.env.vapidPublic;
privateVapidKey = process.env.vapidPrivate

const options = {
    vapidDetails: {
        subject: 'mailto:admin@skalarly.com',
        publicKey: publicVapidKey,
        privateKey: privateVapidKey,
    },
    TTL: 60,
  };
// cloudinary
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret,
    // Untag when https
    secure: true
  });




const MIME_TYPE_MAP ={
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
};

const storage  = multer.diskStorage({   
    filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase();
    // const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name );
        // + '-' + Date.now() + '.' + ext);
    }
});
const limits = { fileSize: 1000 * 1000 * 10 }; // limit to 10mb images
const limitsLarge = { fileSize: 1000 * 1000 * 100}; // limit to 100mb videos


// Post recieving
router.get("", async(req, res, next) => {
    const counter = req.query.counter
    await Post.find().sort({_id:-1}).skip(counter).limit(6)
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
router.get("/feed", async(req, res, next) => {
    const counter = req.query.counter
   await Post.find({ OriginalPostId: { $eq: '' } }).sort({_id:-1}).skip(counter).limit(6)
    .then(docs => {
            res.status(200).json({
                message: 'Posts feed fetched succesfully!',
                posts: docs
       });
    })  
    .catch(error => {
        res.status(500).json({
            message: 'Fetching feed posts failed!'
        });
    });
});
// Hashtag Page
router.get("/hashtagPage", async(req, res, next) => {
    const counter = req.query.counter;
    const hashtag = req.query.hashtag;
    console.log('counter',counter);
    console.log('hashtag',hashtag);

    await Post.find({ $and: [
        { OriginalPostId: { $eq: '' } },
        { $or: [
        {Hashtag1:hashtag}, {Hashtag2:hashtag},
         {Hashtag3:hashtag}, {Hashtag4:hashtag}, {Hashtag5:hashtag} 
       ]}
    ]}).sort({_id:-1}).skip(counter).limit(6)
       .then(docs => {
        console.log('hash', docs)
        res.status(200).json({
            message: 'Hashtag feed fetched succesfully!',
            posts: docs
   });
})  
.catch(error => {
    res.status(500).json({
        message: 'Fetching feed posts failed!'
    });
});

})



router.get("/sharedPosts", async(req, res) => {
    const counter = req.query.counter;
    const userId = req.query.userId
await Post.find({OriginalCreatorId: userId}).sort({_id:-1}).skip(counter).limit(6)
.then(docs => {
    res.status(200).json({
        message: 'Posts shared fetched succesfully!',
        posts: docs
});
})  
.catch(error => {
res.status(500).json({
    message: 'Fetching shared posts failed!'
});
});
})
// Post recieving Feed
router.get("/friends", async(req, res, next) => {
    const counter = req.query.counter;
    await Follow.find({Follower:req.query.userId})
    .then(Following => {
        console.log('following', Following);
        let first = [];
          Following.forEach((e)=>{
        console.log('away', e.FollowingId)
         first.push(e.FollowingId);
                })
        console.log('followingIds', first);
        Post.find({Creator: first}).sort({_id:-1}).skip(counter).limit(6)
        .then(FollowingPosts => {
            console.log('ryhmes', FollowingPosts )
            res.status(200).json({
                message: 'Friends feed fetched succesfully!',
                posts: FollowingPosts
        })
    })
    })
});
// Posts trending
router.get("/Trending", async(req, res, next) => {

    await Post.find({ OriginalPostId: {$eq: ''}}).sort({Reposts: -1 }).limit(20)
    .then(FinalTrending => {
            console.log('lover',FinalTrending )
            res.status(200).json({
                message: 'Thats whats trending!',
                posts: FinalTrending
            })  
          
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching top 20 posts failed!'
            });
        });
});
// Number of reposts
router.get("/TrendingNumber", async(req, kristina, next) => {
  
   await Post.find({ OriginalPostId: req.query.postId })
    .then(Trending => {
        let list = Trending.filter((e) => ((e.OriginalPostId !== '') )) 
console.log('love you', list);
console.log('love', list.length);


          kristina.status(200).json({
            message: 'Number of reposts returned!',
            posts: list.length
        });

       
        })
   
   
})

// Number of reposts
router.get("/TrendingNumberOwn", async(req, kristina, next) => {
  console.log('heart beat',req.query.postId);
    await Post.find({ OriginalPostId: req.query.postId })
     .then(Trending => {
 console.log('love you1', Trending);
 console.log('love1', Trending.length);
 
 
           kristina.status(200).json({
             message: 'Number of reposts returned!',
             posts: Trending.length
         });
 
        
         })
    
    
 })

// Post recieving personal
router.get("/personal", async(req, res, next) => {
    const counter = req.query.counter;
     await Post.find({Creator: req.query.userId}).sort({_id:-1}).skip(counter).limit(6)
    .then(docs => {
        res.status(200).json({
            message: 'Posts personal fetched succesfully!',
            posts: docs
        });

    })  
    .catch(error => {
        res.status(500).json({
            message: 'Fetching personal posts failed!'
        });
    });

});
const image = multer({ storage: storage, limits})
const video = multer({ storage: storage, limitsLarge})

// const filesUp = up.fields([
//     { name: 'upload', maxCount: 1 },
//     { name: 'video', maxCount: 1 }
//   ])
  
// Post additions
router.post("", checkAuth,
image.single('upload'),
    async(req, res) => {
    await UserInfo.findOne({Creator: req.query.userId })
    .then(documents => {
         
            if(req.file){
             cloudinary.uploader.upload(req.file.path, {
                folder:'Posts'
             })
             .then(result => {
            console.log('upload',result)
            var post = new Post({
                Reposts: 0,
                OriginalCreatorId: '',
                OriginalPostId: '',
                SharerUsername: '',
                SharerName: '',
                SharerProfilePicPath: '',
                Username: documents.username,
                Name: documents.name,
                ProfilePicPath: documents.ProfilePicPath,
                Title: req.body.Title,
                postDescription: req.body.postDescription,
                postLocation: req.body.postLocation,
                LocationEvent: req.body.LocationEvent,
                time: req.body.time,
                timeE: req.body.timeE,
                // date: req.body.date,
                // dateE: req.body.dateE,
                gender: req.body.gender,
                live: req.body.live,
                paymentService: req.body.paymentService,
                nopaymentService: req.body.nopaymentService,
                virtual: req.body.virtual,
                event: req.body.event,
                Hashtag1: req.body.Hashtag1,
                Hashtag2: req.body.Hashtag2,
                Hashtag3: req.body.Hashtag3,
                Hashtag4: req.body.Hashtag4,
                Hashtag5: req.body.Hashtag5,
                ImagePath: result.secure_url,
                VideoPath: '',
                cloudinary_id: result.public_id,
                Creator: req.userData.userId
            });
            post.save().then(createdPost => {
                console.log('hey babe',req.body.time, 'luv u', req.body.timeE )
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
             })
            })
                }else{
             var post = new Post({
                Reposts: 0,
                OriginalCreatorId: '',
                OriginalPostId: '',
                SharerUsername: '',
                SharerName: '',
                SharerProfilePicPath: '',
                Username: documents.username,
                Name: documents.name,
                ProfilePicPath: documents.ProfilePicPath,
                Title: req.body.Title,
                postDescription: req.body.postDescription,
                postLocation: req.body.postLocation,
                LocationEvent: req.body.LocationEvent,
                time: req.body.time,
                timeE: req.body.timeE,
                // date: req.body.date,
                // dateE: req.body.dateE,
                gender: req.body.gender,
                live: req.body.live,
                paymentService: req.body.paymentService,
                nopaymentService: req.body.nopaymentService,
                virtual: req.body.virtual,
                event: req.body.event,
                Hashtag1: req.body.Hashtag1,
                Hashtag2: req.body.Hashtag2,
                Hashtag3: req.body.Hashtag3,
                Hashtag4: req.body.Hashtag4,
                Hashtag5: req.body.Hashtag5,
                ImagePath: '',
                VideoPath: '',
                cloudinary_id: '',
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
        }
           
    })
    .catch(error => {
        res.status(500).json({
            message: 'Posting failed!'
        });
    });
});
// Post videos
router.post("/videos", checkAuth,
video.single('video'),
    async(req, res) => {
    await UserInfo.findOne({Creator: req.query.userId })
    .then(documents => {
        console.log('home3 ',req.file.path)
            console.log('wasted',req.file.path);
            cloudinary.uploader.upload(req.file.path, 
                { resource_type: "video", folder:'Posts' }
          )
            .then(result => {
                console.log('video',result)

           var post = new Post({
                Reposts: 0,
                OriginalCreatorId: '',
                 OriginalPostId: '',
                SharerUsername: '',
                SharerName: '',
                SharerProfilePicPath: '',
               Username: documents.username,
               Name: documents.name,
               ProfilePicPath: documents.ProfilePicPath,
               Title: req.body.Title,
               postDescription: req.body.postDescription,
               postLocation: req.body.postLocation,
               LocationEvent: req.body.LocationEvent,
               time: req.body.time,
               timeE: req.body.timeE,
            //    date: req.body.date,
            //    dateE: req.body.dateE,
               gender: req.body.gender,
               live: req.body.live,
               paymentService: req.body.paymentService,
               nopaymentService: req.body.nopaymentService,
               virtual: req.body.virtual,
               event: req.body.event,
               Hashtag1: req.body.Hashtag1,
               Hashtag2: req.body.Hashtag2,
               Hashtag3: req.body.Hashtag3,
               Hashtag4: req.body.Hashtag4,
               Hashtag5: req.body.Hashtag5,
               ImagePath: '',
               VideoPath: result.secure_url,
               cloudinary_id: result.public_id,
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
            })
           })
           .catch(error => {
            res.status(500).json({
                message: 'uploading video failed!'
            });
        })
     
           
    })
    .catch(error => {
        res.status(500).json({
            message: 'Posting failed!'
        });
    });
});
// Post additions
router.post("/Shared", checkAuth,
    async(req, res) => {
        console.log('help',req.query.postId)
        await  Post.findOne({_id: req.query.postId})
        .then(POST => {
            console.log('POST', POST)
            Post.updateOne({_id: POST.id}, {$inc: {Reposts: 1}})
            .then(New => {
                console.log('baby dragon', New);
            }) .catch(error => {
                res.status(500).json({
                    message: 'Updating your post failed!'
                });
            });
                 UserInfo.findOne({Creator: req.query.userId })
    .then(documents => {

             var post = new Post({
                Reposts: 0,
                OriginalCreatorId: POST.Creator,
                OriginalPostId: POST._id,
                SharerUsername: documents.username,
                SharerName: documents.name,
                SharerProfilePicPath: documents.ProfilePicPath,
                Username: POST.Username,
                Name: POST.Name,
                ProfilePicPath: POST.ProfilePicPath,
                Title: POST.Title,
                postDescription: POST.postDescription,
                postLocation: POST.postLocation,
                LocationEvent: POST.LocationEvent,
                time: POST.time,
                timeE: POST.timeE,
                // date: req.body.date,
                // dateE: req.body.dateE,
                gender: POST.gender,
                live: POST.live,
                paymentService: POST.paymentService,
                nopaymentService: POST.nopaymentService,
                virtual: POST.virtual,
                event: POST.event,
                Hashtag1: POST.Hashtag1,
                Hashtag2: POST.Hashtag2,
                Hashtag3: POST.Hashtag3,
                Hashtag4: POST.Hashtag4,
                Hashtag5: POST.Hashtag5,
                ImagePath: POST.ImagePath,
                VideoPath: POST.VideoPath,
                cloudinary_id: POST.cloudinary_id,
                Creator: req.userData.userId
            });
            post.save().then(createdPost => {
                res.status(201).json({
                    message: 'Post added successfully',
                    post: {
                        id: createdPost._id,
                        ...createdPost
                    } 
                });
              
                    console.log('calling', POST);
                    // Match subscription to post creator then send it 
                    // Or else when a subscriber comments on a non subscriber itll send a notif as if it was the subscribers post
                    // Creator of post gets notified find them first...
                        Subscription.findOne({Creator: POST.Creator})
                        .then(checking => {
                            console.log('checking', checking)
                            if((checking !== null) ){
                            const p256dh = checking.keys.p256dh
                            const auth = checking.keys.auth
                            const endpoint = checking.endpoint
                            const pushSubscription = {
                                keys: {
                                 p256dh: p256dh,
                                 auth: auth
                                        },
                                 endpoint: endpoint,
                                };
                      publicVapidKey = process.env.vapidPublic;
                      privateVapidKey = process.env.vapidPrivate
                  webpush.setVapidDetails('mailto:admin@skalarly.com', publicVapidKey, privateVapidKey);
                  webpush.sendNotification(pushSubscription, JSON.stringify({
                      title: 'Post Shared!',
                      content: `${documents.username} has shared your post.`,
                      openUrl: '/activity-history'
                  }), options)
                  .then((_) => {
                    console.log( 'Shared!');
                })
                  .catch( (err) => {
                      console.log('uh ooo',err);
                      var missedNotif = new missedHistory({
                        username: POST.Username,
                        message: '',
                        time: '',
                        body: POST.postDescription,
                        Follower: '',
                        postId: req.body.postId,
                        Creator: req.userData.userId
        
                      })
                      missedNotif.save();
                      console.log('missed shared saved and notified')
                  });
                             
                            }else{
                                console.log('no subscription');
                            }
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'Notifiying post failed!'
                    });
                })
           
        }) 
        .catch(error => {
            res.status(500).json({
                message: 'Finding your post failed!'
            });
        });
    })
    .catch(error => {
            res.status(500).json({
                message: 'Creating your post failed!'
            });
        });
}) .catch(error => {
    res.status(500).json({
        message: 'Uploading your post failed!'
    });
});
    });
// Posts deleting
router.delete("/:id", checkAuth, async(req, res, next ) => {
   await Post.findOne({_id: req.params.id})
   .then(result => {
    console.log('result',result)
    if(result.ImagePath && (result.OriginalPostId == '')) {
    cloudinary.uploader.destroy(result.cloudinary_id)
    }else{
        console.log('No Image')
    }
    if(result.VideoPath && (result.OriginalPostId == '')) {
        cloudinary.uploader.destroy(result.cloudinary_id)
        }else{
            console.log('No Video')
        }
       
                // delete repost comments
Post.find({OriginalPostId: req.params.id})
.then(postIds => {
    console.log('nice', postIds)
    let first = [];
    postIds.forEach((e)=>{
        console.log('away', e._id)
         first.push(e._id);
                })
                Comment.deleteMany({postId: first}) 
                .then(reposted => {
                    if (reposted){
                        console.log('Reposts comments deleted!',reposted);
                        } else {
                            console.log('No repost comments');
                        } 
                })
})

Post.deleteMany({OriginalPostId: result._id})
.then(reposted => {
    if (reposted){
        console.log('Reposts deleted!');
        } else {
            console.log('No reposted');
        } 
        Post.deleteOne({_id: req.params.id}).then(result => {
            if (result){
            console.log('Post deleted!');
            } else {
                console.log('Not authorized');
            } 
        })
        .catch(error => {
            res.status(500).json({
                message: 'Deleting post failed!'
            });
        })
// 
Comment.deleteMany({postId: req.params.id})
    .then(result => {
        console.log('comments deleted',result)
        // res.status(200).json({message: 'Comments deleted!'});

}).catch(error => {
    res.status(500).json({
        message: 'Deleting posts comments failed!'
    });
})
})
        res.status(200).json({message: 'Everything worked!'});
      
})
.catch(error => {
    res.status(500).json({
        message: 'Finding post failed!'
    });
})



// del comments inside reposted posts

 
})

// get Comment on post
router.get('/comments', async(req, res) =>{
    await Comment.find({postId: req.query.postId}).sort({_id:-1})
    .then(documents => {
        console.log('hey chaz man man');
    res.status(200).json({
        message: 'comments fetched succesfully!',
        messages: documents
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Fetching comments failed!'
        });
    });
});
    // get Comments history
    router.get('/commentsHistory', async(req, res) =>{
    const counter = req.query.counter
        await Post.find({Creator: req.query.userId})
        .then(postId => {
            const result = postId.map( postId  =>      
                postId._id)
            console.log('hey sun', result)
            Comment.find({postId: result}).sort({_id:-1}).skip(counter).limit(6)
            .then(documents => {
            console.log('chaz man 2', documents);
                res.status(200).json({
                    message: 'comments history fetched succesfully!',
                    messages: documents
                    });
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Fetching comments failed 1'
                });
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching comments failed!'
            });
        });
    });
//  Comment on post
router.post('/comments',
 async(req, res) => { 
if (req.body.userId){
    await UserInfo.findOne({Creator: req.body.userId })
    .then(documents => {
    var comment = new Comment({
        body: req.body.body,
        username: documents.username,
        time: req.body.time,
        postId: req.body.postId,
        ProfilePicPath: documents.ProfilePicPath,
        Creator: req.body.userId
    })
    comment.save()
    .then(createdComment => {
        res.status(201).json({
            message: 'Comment added successfully',
            messages: {
                id: createdComment._id,
                ...createdComment
            } 
        });
        try{
            // Match subscription to post creator then send it 
            // Or else when a subscriber comments on a non subscriber itll send a notif as if it was the subscribers post
            // Creator of post gets notified find them first...
            Post.findOne({id: req.body.postId})
            .then((user) => {
                console.log('user 77', user)

                Subscription.findOne({Creator: user.Creator.valueOf()})
                .then(checking => {
                    if((checking !== null) && (user.Creator.valueOf() !== req.body.userId)){
                    const p256dh = checking.keys.p256dh
                    const auth = checking.keys.auth
                    const endpoint = checking.endpoint
                    const pushSubscription = {
                        keys: {
                         p256dh: p256dh,
                         auth: auth
                                },
                         endpoint: endpoint,
                        };
              publicVapidKey = process.env.vapidPublic;
              privateVapidKey = process.env.vapidPrivate
          webpush.setVapidDetails('mailto:admin@skalarly.com', publicVapidKey, privateVapidKey);
          webpush.sendNotification(pushSubscription, JSON.stringify({
              title: 'Post Comment!',
              content: `${documents.username} has commented on your post.`,
              openUrl: '/activity-history'
          }), options)
          .then((_) => {
            console.log( 'Commented!');
        })
          .catch( (err) => {
              console.log('uh ooo',err);
              var missedNotif = new missedHistory({
                username: documents.username,
                message: '',
                time: req.body.time,
                body: documents.body.body,
                Follower: '',
                postId: req.body.postId,
        Creator: req.body.userId

              })
              missedNotif.save();
              console.log('missed comment saved and notified')
        })
    }
                    
                    })
        })
                } catch{
                        console.log('User does not have a subscription for followers')
                    }
                    })
                    .catch(err => {
                        return res.status(401).json({
                            message: "Invalid following error!"})
                                })
    })
    .catch(err => {
        return res.status(401).json({
            message: "Invalid follow error!"})
                })
            }})
// Comments deleting
router.delete("/comments/:id", checkAuth, (req, res, next ) => {
    Comment.deleteOne({_id: req.params.id}).then(result => {
        if (result){
        res.status(200).json({message: 'Comment deleted!!'});
        } else {
            res.status(401).json({message: 'Not authorized'});
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'Fetching comment failed!'
        });
    });
});
// Get others posts
router.get("/otherUsers", async(req, res) => {
    const counter = req.query.counter
    console.log('grow', counter)
    console.log('growing', req.query.id)

        await UserInfo.findOne({username: {$eq: req.query.id}})
        .then(docs => {
    console.log('dolla', docs)

            Post.find({Creator: docs.Creator}).sort({_id:-1}).skip(counter).limit(6)
           .then(doc => {
            res.status(200).json({
                message: 'Infos fetched succesfully!',
                posts: doc
            });
           })  
           .catch(error => {
            res.status(500).json({
                message: 'Fetching posts failed!'
            });
        });
        })  
        .catch(error => {
            res.status(500).json({
                message: 'Fetching user failed!'
            });
        });

});
// Get main page posts
router.get("/mainPage", async(req, res) => {    
    const counter = req.query.counter;
    console.log('street crimes 3 ');
         await Post.find({ $and: [ {postLocation: req.query.category}, { OriginalPostId: { $eq: '' } }]}).sort({_id:-1}).skip(counter).limit(6)
           .then(doc => {
            res.status(200).json({
                message: 'Infos fetched succesfully!',
                posts: doc
            });
           }) 
           .catch(error => {
            res.status(500).json({
                message: 'Fetching posts failed!'
            });
        });
           
});
// Get single page post
router.get("/singlePage", async(req, res) => {    
    console.log('love in the air 7 ',req.query.postId);
         await Post.find({_id: req.query.postId})
           .then(doc => {
            console.log('dogs', doc)
            res.status(200).json({
                message: 'Single post fetched succesfully!',
                posts: doc
            });
           }) 
           .catch(error => {
            res.status(500).json({
                message: 'Fetching posts failed!'
            });
        });
           
});
// Get others posts
router.get("/otherUsersInfos", async(req, res) => {
        await UserInfo.findOne({username: {$eq: req.query.id}})
        .then(docs => {
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
        const counter = req.query.counter
        await UserInfo.findOne({username: {$eq: req.query.id}})
        .then(docs => {
            showCase.find({Creator: docs.Creator}).sort({_id:-1}).skip(counter).limit(6)
           .then(doc => {
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
    const counter = req.query.counter
    await UserInfo.findOne({Creator: {$eq: req.query.userId}})
    .then(docs => {
        showCase.find({Creator: docs.Creator}).sort({_id:-1}).skip(counter).limit(6)
       .then(doc => {
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
// showCase additions
const image_ = multer({ storage: storage, limits})
const video_ = multer({ storage: storage, limitsLarge})
// const files_ = show.fields([
//     { name: 'showCase', maxCount: 1 },
//     { name: 'video', maxCount: 1 }
//   ])
router.post("/showCases", 
    checkAuth,
    image_.single('showCase'),
    async(req, res) => {
        if (req.file){
        await cloudinary.uploader.upload(req.file.path, {
           folder:'ShowCase'
        })
        .then(result => {
            var ShowCase = new showCase({
                ShowCasePath: result.secure_url,
                VideoPath:'',
                cloudinary_id: result.public_id,
                Creator: req.userData.userId
            });
         ShowCase.save().then(createdPost => {
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
    }else{ res.status(500).json({
        message: 'Creating a showCase failed!'
    });
}
});
router.post("/showCases/video", 
    checkAuth,
    video_.single('video'),
    async(req, res) => {
        if (req.file){
        await cloudinary.uploader.upload(req.file.path, {
            resource_type: "video", folder:'ShowCase'
        })
        .then(result => {
            var ShowCase = new showCase({
                ShowCasePath: '',
                VideoPath: result.secure_url,
                cloudinary_id: result.public_id,
                Creator: req.userData.userId
            });
         ShowCase.save().then(createdPost => {
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
    }else{ res.status(500).json({
        message: 'Creating a showCase failed!'
    });
}
});

// showCase deleting
router.delete("/showCases/:id", checkAuth, async(req, res, next ) => {
    console.log('cereal', req.params.id)
   await showCase.findOne({_id: req.params.id})
   .then(result => {
    console.log('meeee', result)
        cloudinary.uploader.destroy(result.cloudinary_id)
        .then( docs => {
            console.log('it worked')
        showCase.deleteOne({_id: req.params.id}).then(result => {
            if (result){
            res.status(200).json({
                message: 'Deleting a showCase worked!'
            });
            } else {
                res.status(401).json({message: 'Not authorized'});
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fetching showCases failed!'
            });
        });
        console.log('docs', docs)
    })
    })
 
});

// Check Notifications 
router.get("/checkNotif", async (req, res) => {
    console.log('hey night owl', req.query.id)
    await Subscription.findOne({Creator: req.query.id})
    .then(documents => {
        console.log('Notifications are connected!', documents);
        res.status(200).json({
            infos: documents
        });

    }).catch(() => {
        res.status(500)
            console.log('Notifications are not connected')
      
    })
})
// Delete conversation
router.delete("/delConvo/:postId", checkAuth, async(req, res, next ) => {

    console.log('thankyou sir', req.params.postId)
    Msg.findOne({_id: req.params.postId})
    .then((found) => {
        console.log('found', found);
        Msg.deleteMany({ 
            $and: [
                {username: found.username},
                {otherUser: found.otherUser}
            ]
        })
        .catch(error => {
            console.log('del messages failed')
            // res.status(500).json({
            //     message: 'Deleting Messages failed 1'
            // });
        });
        Msg.deleteMany({ 
            $and: [
                {username: found.otherUser},
                {otherUser: found.username}
            ]
        })
        .catch(error => {
            console.log('del messages failed')
            // res.status(500).json({
            //     message: 'Deleting Messages failed 2'
            // });
        });
        res.status(200).json({
            message: 'Deleting Conversation worked'
        });
    })
  
    })
// Delete Notification 
router.delete("/deleteNotif/:id", checkAuth, async(req, res, next ) => {
    console.log('thank', req.params.id)
    await Subscription.deleteOne({Creator: req.params.id})
    .then((result) =>{
        res.status(200).json({
            infos: result
        });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Deleting notifications failed!'
            });
        });
    })
module.exports = router;