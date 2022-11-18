const Subscription = require('/app/backend/models/subscription');
const User = require('/app/backend/models/user');
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
       Creator: subscription.userId,
        endpoint: subscription.data.endpoint,
        keys: {
            p256dh: subscription.data.keys.p256dh,
            auth: subscription.data.keys.auth,
          }
    })
    subscription_.save()
    .then( subscriptionId => {  
      publicVapidKey = process.env.vapidPublic;
      privateVapidKey = process.env.vapidPrivate
    webpush.setVapidDetails('mailto:admin@skalarly.com', publicVapidKey, privateVapidKey);
    webpush.sendNotification(pushSubscription, JSON.stringify({
        title: 'Notifications subscribed',
        content: 'You will now recieve notifications',
        openUrl: '/friends-activity'
    }), options)
    .then((_) => {
      console.log('SENT!!!');
      res.status(201).json({
        message: 'Registration complete'
      });
  })
    .catch( (err) => {
        console.log('uh o',err)
        res.status(501).json({
          message: 'Registration error'
        });;
    });
        console.log('notification saving yo',subscriptionId);
        res.status(201).json({
          message: 'Registration completed'
        });;

        })
        .catch( (err) => {
          res.status(500).json({
            message: 'Registration error'
          });
        });
})

module.exports = router;