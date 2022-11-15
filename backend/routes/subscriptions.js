const Subscription = require('/app/backend/models/subscription');
const User = require('/app/backend/models/user');
const express = require('express');

const UserInfo = require('/app/backend/models/userInfo');
const router = express.Router();
const webpush = require('web-push');
const req = require('express/lib/request');
publicVapidKey = process.env.vapidPublic;
privateVapidKey = process.env.vapidPrivate



router.post("/follow", (req, res, next) => {
    console.log('route made it',req.body)
    //get push subscription object from the request
    const subscription = req.body;

    //send status 201 for the request
    res.status(201).json({})

    //create paylod: specified the detals of the push notification
    const payload = JSON.stringify({title: 'Section.io Push Notification' });

    //pass the object into sendNotification fucntion and catch any error
    webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
    
    
    
    
    
    //   var subscription = new Subscription({
    //     endpoint: req.body.endpoint,
    //     keys: {
    //         p256dh: req.body.keys,
    //         auth: req.body.auth,
    //       },
      

    // })
    // subscription.save()
    // .then( (subscriptionId) => {   
    //       res.setHeader('Content-Type', 'application/json');
    //       res.send(JSON.stringify({data: {success: true}}));
    //     })
    //     .catch( (err) => {
    //       res.status(500);
    //       res.setHeader('Content-Type', 'application/json');
    //       res.send(
    //         JSON.stringify({
    //           error: {
    //             id: 'unable-to-save-subscription',
    //             message:
    //               'The subscription was received but we were unable to save it to our database.',
    //           },
    //         }),
    //       );
    //     });

})

module.exports = router;