// SERVER
// Importing using node-js
const http = require('http');
// server.js

/**
 * Required External Modules
 */
 const express = require('express');
 const bodyParser = require('body-parser');
//  const webpush = require('web-push')



const publicVapidKey = 'BD3BblVzyiaqnIYKfJHpaJ4Gil-BDYvUh5WlRmfMu5KULOb-TdMa0ZXdOqKHg56c3U36eUJZKlfuPLh-90cHgFE';
const privateVapidKey = '1zXzUpQkkPMygH5d00CmVwabGO6nzYUNEWXTRDwNBKI';

// webpush.setVapidDetails('mailto:Skalarly@Skalarly.com', publicVapidKey, privateVapidKey);




 const path = require('path');
 const mongoose = require('mongoose');

//  inst being found when hosted
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
 const server = http.createServer(app)
 const port = process.env.PORT || 3000;
//  const port = process.env.PORT || 5000
 const router = express.Router();


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
            console.log('hey Message', Message)
    
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
mongoose.connect('mongodb+srv://Olsen07:Hockey07@cluster0.rcx6w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
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
app.use(express.static('build'))
app.use('/posts', express.static('/app/backend/posts'));
app.use('/profilePics', express.static(path.join('/app/backend/profilePics')));
app.use('/showCase', express.static(path.join('/app/backend/showCase')));




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
 app.get("/", (req, res) => {
   res.status(200).sendFile( '/app/angular-SCHOLARLY/src/index.html');
})




// Express

// Change port to azure or Heroku...
const routes = require('/app/backend/api');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { Socket } = require('socket.io');

app.use(express.static('/app/angular-SCHOLARLY/static'))
app.use('/api', routes)

app.get('*', (req, res) => {
    res.sendFile( '/app/angular-SCHOLARLY/src/index.html')
})


module.exports = app


