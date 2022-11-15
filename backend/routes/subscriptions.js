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
    console.log('route made it')
    // var subscription = new Subscription({
    //     userId: req.userData.userId,
    //     endpoint: ,


    // })

})