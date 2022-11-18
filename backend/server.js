// SERVER
// Importing using node-js
const https = require('http');
// server.js


/**
 * Required External Modules
 */
 const express = require('express');
 const bodyParser = require('body-parser');
//  const webpush = require('web-push')


const webpush = require('web-push');
const payload = {
notification: {
  body: 'You will now recieve notifations',
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
  // TTL: 60,
};








 const path = require('path');
 const mongoose = require('mongoose');
 const cloudinary = require('cloudinary')

 const postRoutes = require('/app/backend/routes/posts');
 const userRoutes = require('/app/backend/routes/user');
 const messageRoutes = require('/app/backend/routes/messages')
 const followRoutes = require('/app/backend/routes/follow')
 const subscribeRoutes = require('/app/backend/routes/subscriptions')

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
 // Subscribe route for webpush 
app.post('/subscribe', (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;

    // Send 201 - resource created
    res.status(201).json({});

    // Create payload 
    const payload = JSON.stringify({ title: ' Push Test'});

    // Pass object into sendNotification
    webpush.sendNotification(subscription, payload)
    .catch(err => console.error(err));
})


   
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
                                you: data.userId
                            })
        MESSAGE.save().then(createdMsg => {
            socket.emit('messageSnd', formatMessage(username.username, Message, data.time ))
        
            })
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
// app.use('/worker', express.static('/app/angular-SCHOLARLY/src/worker'));



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
