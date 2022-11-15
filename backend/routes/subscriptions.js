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

      var subscription = new Subscription({
        userId: req.userData.userId,
        endpoint: req.body.endpoint,
        keys: {
            p256dh: req.body.keys,
            auth: req.body.auth,
          },
      

    })
        .then(function (subscriptionId) {
         subscription.save()
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({data: {success: true}}));
        })
        .catch(function (err) {
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