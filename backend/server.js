// SERVER
// Importing using node-js
const https = require('http');
// server.js


/**
 * Required External Modules
 */
 const express = require('express');
 const bodyParser = require('body-parser');



const webpush = require('web-push');
const payload = {
notification: {
  body: 'You will now recieve notifications',
  icon: '/angular-SCHOLARLY/src/faviconH.ico',
  image: '../../assets/Pics/Skalarly jpeg 2 (hat & logo).png',
  vibrate: [100, 50, 100],
  badge: '/angular-SCHOLARLY/src/faviconH.ico',
  tag: 'confirm-notification',
  actions: [
    {action: 'confirm', title: 'Okay', icon:'/angular-SCHOLARLY/src/faviconH.ico'},
    {action: 'cancel', title: 'Cancel', icon:'/angular-SCHOLARLY/src/faviconH.ico'},

  ]
}
};
publicVapidKey = process.env.vapidPublic;
privateVapidKey = process.env.vapidPrivate
const options = {
  vapidDetails: {
      subject: 'mailto:admin@skalarly.com',
      publicKey: publicVapidKey,
      privateKey: privateVapidKey,
  },
  TTL: 60
};


 const path = require('path');
 const mongoose = require('mongoose');


 const postRoutes = require('/app/backend/routes/posts');
 const userRoutes = require('/app/backend/routes/user');
 const messageRoutes = require('/app/backend/routes/messages')
 const followRoutes = require('/app/backend/routes/follow')
 const filterSearchRoutes = require('/app/backend/routes/filterSearch')
 const missedHistory = require('/app/backend/models/missed-notification');

 const subscribeRoutes = require('/app/backend/routes/subscriptions')

 const BlockSkalar = require('/app/backend/models/block-skalar');
 const UserInfo = require('/app/backend/models/userInfo');
 const Subscription = require('/app/backend/models/subscription');
 const Msg = require('/app/backend/models/messages')
 const formatMessage = require('/app/angular-SCHOLARLY/src/app/utils/messages')
 const User = require('/app/backend/models/user');
//  const serviceWorkerRegister = require('/app/angular-SCHOLARLY/src/worker');



/**
 * App Variables
 */
 const app = express();
//  Force http requests to https
//  app.use('/',(req,res) => {
//     console.log('gst chase',req.get('X-Forwarded-Proto'))
//     if (req.protocol === 'http') {
//         res.redirect(301,'https://' +
//     req.get('host') + req.originalUrl)
    
// }else{
//     console.log('your already safe')
    
// }
// })
    
 const server = https.createServer(app)
  

 const port = process.env.PORT || 3000;




//  Socket.io 

/**
 * Server Activation
 */

 server.listen(port, () => {
  console.log(`Listening to requests on ${port}`);
})

const socketio = require('socket.io');
const io = socketio(server);
app.set('socketio', io);

io.on('connection', (socket) => {

    socket.on('chat-messageSnd', (data) => {
       

      const userId = data.userId
      console.log('userId',userId);
      console.log('data',userId);

      User.findOne({username: data.otherUser})
.then(userOne => {
    console.log('userOne username', userOne);
       BlockSkalar.find({Creator: userOne._id}).then(blocked => {
          console.log('blocked heart', blocked);
          if(blocked){
              blockedList = []
              blocked.forEach((e) => {
                  blockedList.push(e.blockedUsername)
              })
              console.log('blockedList',blockedList);
              let blockedMatches = blockedList.filter(e => e.blockedUsername == data.username)
              console.log('blockedMatches', blockedMatches);
              if(blockedMatches.length > 0){
                console.log('this skalar has blocked you');
              }else{
              console.log('not blocked');
              const Message = data.message
              User.findById({_id: data.userId})
            .then(user => {
            User.findOne({username: user.username})
            .then(username => {
                console.log('Hey Message', Message)
        
            // saving msg
            
            if (data.otherUser !== undefined ) {
            const MESSAGE = new Msg({username: username.username,
                                    message: Message,
                                    time: data.time,
                                    otherUser: data.otherUser,
                                    you: data.userId,
                                    viewed: false
                                })
            MESSAGE.save().then(createdMsg => {
                socket.emit('messageSnd', formatMessage(username.username, Message, data.time ));
                // Send notification to subscription
                try{
                  UserInfo.findOne({username: data.otherUser })
                  .then((user) => { 
                // console.log('road is open', user);
                    Subscription.findOne({Creator: user.Creator})
                    .then(subscriber =>{
                // console.log('road is opener', subscriber);
    if(subscriber !== null){
      Subscription.findOne({Creator: user.Creator})
      .then(subscriber => {
        const p256dh = subscriber.keys.p256dh
        const auth = subscriber.keys.auth
        const endpoint = subscriber.endpoint
                const pushSubscription = {
                    keys: {
                      auth: auth,
                      p256dh: p256dh
                    },
                    endpoint: endpoint,
                  };
                  publicVapidKey = process.env.vapidPublic;
                  privateVapidKey = process.env.vapidPrivate
                webpush.setVapidDetails('mailto:admin@skalarly.com', publicVapidKey, privateVapidKey);
                webpush.sendNotification(pushSubscription, JSON.stringify({
                    title: 'New Message!',
                    content: ` ${data.otherUser} has messaged you.`,
                    openUrl: '/search'
                }), options)
                .then((_) => {
                  console.log( 'SENT Message');
              })
                .catch(error => {
                  User.findOne({username: data.otherUser})
                  .then(user => {
    
                    console.error(error);
                    var missedNotif = new missedHistory({
                      username: username.username,
                      message: Message,
                      time: data.time, 
                      body: '',
                      Follower: '',
                      postId: '',
                      Creator: user._id
          
                    })
                    missedNotif.save();
                    console.log('missed followed saved and notified')
                  })
                })}) 
              }})
                .catch(err => {
                  console.log('No subscription for messages', err)
                })
                })
                }catch{
                  console.log('User does not have a subscription for messages')
                      } }).catch(err => {
                        return res.status(401).json({
                            message: "Invalid messaging error!"})
                                })
                    }else{
                      console.log('Message can not be saved or sent!')
                    }   })   }) 
              }
            }
          })
          })

         
              }) 
            
            
            })
                                          

//  DataBase connection
mongoose.connect(process.env.mongodb)
.then(()  => {
    console.log('Connected to database!!');
})
.catch(( ) => {
    console.log('Not connected');
});




/**
 *  App Configuration
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('build'));
app.use('/posts', express.static('/app/backend/posts'));
app.use('/profilePics', express.static('/app/backend/profilePics'));
app.use('/showCase', express.static('/app/backend/showCase'));




// Connecting to backend images for display


app.use((req, res, next) => {
   res.setHeader( "Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type: 'multipart/form-data', Accept, Authorization");
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
   next();
});

app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/filter", filterSearchRoutes);

app.use("/api/subscribe", subscribeRoutes);

// app.use('/api/worker.js', serviceWorkerRegister);





/**
 * Routes Definitions
 */
 function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (
      req.get("x-forwarded-proto") !== "https"
    //   &&
    // process.env.NODE_ENV !== "development"
    ) {
      return res.redirect("https://" + req.get("host") + req.url);
    }
    next();
  }
 app.use(express.static('/app/angular-SCHOLARLY/static'))

 app.get("/", requireHTTPS, (req, res) => {
         res.status(200).sendFile('/app/angular-SCHOLARLY/src/app');   
})
app.get("/worker.js", (req, res) => {
    res.sendFile( '/app/angular-SCHOLARLY/src/worker.js');
  });

app.get('*', requireHTTPS, (req, res, next) => {
    res.sendFile('/app/angular-SCHOLARLY/static/index.html')

})

// Express

// Change port to azure or Heroku...
const routes = require('/app/backend/api');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { Socket } = require('socket.io');

app.use('/api', routes)




module.exports = app
