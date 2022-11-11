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



const publicVapidKey = process.env.public ;
const privateVapidKey = process.env.private;

// webpush.setVapidDetails('mailto:admin@skalarly.com', publicVapidKey, privateVapidKey);




 const path = require('path');
 const mongoose = require('mongoose');
 const cloudinary = require('cloudinary')

 const postRoutes = require('/app/backend/routes/posts');
 const userRoutes = require('/app/backend/routes/user');
 const messageRoutes = require('/app/backend/routes/messages')
 const followRoutes = require('/app/backend/routes/follow')

 const Msg = require('/app/backend/models/messages')
 const formatMessage = require('/app/angular-SCHOLARLY/src/app/utils/messages')
 const User = require('/app/backend/models/user');
//  const serviceWorkerRegister = require('/Users/chaseolsen/angular_scholarly_fs/angular-SCHOLARLY/src/app/worker.js');




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

// var options = {
//     key: fs.readFileSync(path.join(__dirname, 'skalarly.com_key.txt')),
//     cert: fs.readFileSync(path.join(__dirname, 'skalarly.com.crt')),
//     ca: fs.readFileSync(path.join(__dirname, 'skalarly.com.ca-bundle'))
//    };
   
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
app.use('/worker.js', express.static('/app/angular-SCHOLARLY/src/app/worker.js'));






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
// app.use('/api/serviceWorker', serviceWorkerRegister);





/**
 * Routes Definitions
 */
 app.use(express.static('/app/angular-SCHOLARLY/static'))

 app.get("/", (req, res) => {
         res.status(200).sendFile('/app/angular-SCHOLARLY/src/app');   
})
app.get('*', (req, res, next) => {
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
