const Subscription = require('/app/backend/models/subscription');
const User = require('/app/backend/models/user');
const express = require('express');

const UserInfo = require('/app/backend/models/userInfo');
const router = express.Router();
const webpush = require('web-push');
const req = require('express/lib/request');
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

router.post("/follow", (req, res, next) => {
    //get push subscription object from the request
    const subscription = req.body;

    //send status 201 for the request

    //create payload: specified the detals of the push notification
    console.log('im good',subscription.endpoint)
    console.log('im great',subscription.userId)

    // const payload = {
    //     notification: {
    //       body: 'You will now recieve notifations',
    //       icon: '/angular-SCHOLARLY/src/faviconH.ico',
    //       image: '../../assets/Pics/Skalarly jpeg 2 (hat & logo).png',
    //       vibrate: [100, 50, 100],
    //       badge: '/angular-SCHOLARLY/src/faviconH.ico',
    //       tag: 'confirm-notification',
    //       actions: [
    //         {action: 'confirm', title: 'Okay', icon:'/angular-SCHOLARLY/src/faviconH.ico'},
    //         {action: 'cancel', title: 'Cancel', icon:'/angular-SCHOLARLY/src/faviconH.ico'},
        
    //       ]
    //     }
    //     };
    //pass the object into sendNotification fucntion and catch any error
    var subscription_ = new Subscription({
       Creator: req.userData.userId,
        endpoint: subscription.endpoint,
        keys: {
            p256dh: subscription.keys.p256dh,
            auth: subscription.keys.auth,
          }
    })
    subscription_.save()
    .then( subscriptionId => {  
        webpush.setVapidDetails('mailto:admin@skalarly.com', publicVapidKey, privateVapidKey);
    webpush.sendNotification(subscription.endpoint, JSON.stringify({
        title: 'New Follower',
        content: 'A fellow Skalar has followed you',
        openUrl: '/friends-activity'
    }), options)
    .catch( (err) => {
        console.log('uh o',err)
    })
        console.log('notification saving yo',subscriptionId);
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({data: {success: true}}));
        })
        .catch( (err) => {
          res.status(500);
          res.setHeader('Content-Type', 'application/json');
          res.send(
            JSON.stringify({
              error: {
                id: 'unable-to-save-subscription',
                message:
                  'The subscription was received but we were unable to save it to our database.',
              },
            }),
          );
        });
})

module.exports = router;