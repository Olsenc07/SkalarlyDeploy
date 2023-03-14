const Subscription = require('/app/backend/models/subscription');
const Favs = require('/app/backend/models/favourites');

const express = require('express');

const UserInfo = require('/app/backend/models/userInfo');
const router = express.Router();
const webpush = require('web-push');

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

  // First connection notificiation
router.post("/new", (req, res, next) => {
    //get push subscription object from the request
    const subscription = req.body;

    //send status 201 for the request

    const pushSubscription = {
      endpoint: subscription.data.endpoint,
      keys: {
        auth: subscription.data.keys.auth,
        p256dh: subscription.data.keys.p256dh
      }
    };

    var subscription_ = new Subscription({
       Creator: subscription.userId,
        endpoint: subscription.data.endpoint,
        keys: {
            p256dh: subscription.data.keys.p256dh,
            auth: subscription.data.keys.auth,
          }
    })
    subscription_.save()
    .then( subscriptionId => {  
      UserInfo.findOne({Creator: subscription.userId})
      .then(user => {
        publicVapidKey = process.env.vapidPublic;
        privateVapidKey = process.env.vapidPrivate
      webpush.setVapidDetails('mailto:admin@skalarly.com', publicVapidKey, privateVapidKey);
      webpush.sendNotification(pushSubscription, JSON.stringify({
          title: 'Successful Connection',
          content: `${user.username} will be notified when other Skalars interact with you.`,
          // openUrl: '/friends-activity'
      }), options)
      .then((_) => {
        console.log( 'SENT!');
    })
      .catch( (err) => {
          console.log('uh ooo',err)
          res.status(501).json({
            message: 'Registration error'
          });;
      });
          console.log('notification saving yo');
          res.status(201).json({
            message: 'Registration completed'
          });
      })
      .catch(noUser => {
          console.log('Usernot found...', noUser)
      })
        })
        .catch( (err) => {
          res.status(500).json({
            message: 'Registration error'
          });
        });
})

// gets triggered from main catgeory or hashtag pg
router.post("/favsNew", (req, res, next) => {
  if (req.query.category !== ''){
var save = new Favs({
  userId: req.query.userId,
  category: req.query.category,
  hashtag: ''
})
save.save()
.then( subscriptionId => { 
  res.status(201).json({
    message: 'New Fav Category added successfully',
    favs: subscriptionId
})
}).catch( (err) => {
  res.status(500).json({
    message: 'category error'
  });
});
  }else{
    var save2 = new Favs({
      userId: req.query.userId,
      category: '',
      hashtag: req.query.hashtag
    })
    save2.save()
.then( subscriptionId2 => { 
  res.status(201).json({
    message: 'New Fav Hashtag added successfully ',
    favs: subscriptionId2
})
}).catch( (err) => {
  res.status(500).json({
    message: 'hashtag error'
  });
});
  }
})
// Delete favs main 
router.delete("/deleteFavs/:id", async(req, res, next ) => {
  console.log('thanks next', req.params.id)
  await Favs.deleteOne({_id: req.params.id})
  .then((result) => {
    res.status(200).json({
      message: 'Finding favs and deleting old worked!',
      favs: []
  });
      })
      .catch(error => {
          res.status(500).json({
              message: 'Deleting notifications failed!'
          });
      });
  })
// get favs list
router.get("/favsList", async(req, res) => {
  await Favs.find({userId: req.query.userId})
  .then(favs => {
    res.status(201).json({
      message: 'New Fav Category added successfully',
      favs: favs
  })
  }).catch( (err) => {
    res.status(500).json({
      message: 'Fetching favourites error'
    });
  });
})
// get favs main match
router.get("/favsListMain", async(req, res) => {
  await Favs.findOne(
    { $and: [{userId: req.query.userId}, {category: req.query.category} ]}
    )
  .then(favs => {
    res.status(201).json({
      message: 'New Fav Category added successfully',
      favs: favs
  })
  }).catch( (err) => {
    res.status(500).json({
      message: 'Fetching favourites error'
    });
  });
})
// get favs hashtag match
router.get("/favsListHashtag", async(req, res) => {
  await Favs.findOne(
    { $and: [{userId: req.query.userId}, {hashtag: req.query.hashtag} ]}
    )
  .then(favs => {
    res.status(201).json({
      message: 'New Fav Category added successfully',
      favs: favs
  })
  }).catch( (err) => {
    res.status(500).json({
      message: 'Fetching favourites error'
    });
  });
})
module.exports = router;