// SERVER
// Importing using node-js
const http = require('http');
// server.js

/**
 * Required External Modules
 */
 const express = require('express');
 const bodyParser = require('body-parser');
 const path = require('path');
 const mongoose = require('mongoose');

 const postRoutes = require('./routes/posts');
 const userRoutes = require('./routes/user');


 




/**
 * App Variables
 */
 const app = express();
 const port = 3000;


//  Socket.io attempt 1
const server =  http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/messaging.component.html');
    res.send('<h1>Hello world chase2.0</h1>');
  });
// const socketio = require('socket.io')
// Run when client connect
io.on('connection', (socket) => {
   console.log("New Connection");
   socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});
// //    to the one user
//    socket.emit('message', 'Welcome to Chat Cord!',' User joined chat');

// //    Broadcast when a user connects
// // to all but the poster
// // io.on('connection', socket => {
// //     console.log('new ws connection..')
// // })


// // runs when client disconnect
// socket.on('disconnect', () => {
//     io.emit('message', 'user left chat')
// })

// // Listen for chatMessage
// socket.on('chatMessage', msg => {
//     console.log(msg)
//     io.emit('message', msg);
// })
// });
// module.exports = { app, io };  


// socket.io attempt 2


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
app.use('/posts', express.static(path.join('/Users/chaseolsen/angular_scholarly_fs/backend/posts')));
app.use('/profilePics', express.static(path.join('/Users/chaseolsen/angular_scholarly_fs/backend/profilePics')));
app.use('/showCase', express.static(path.join('/Users/chaseolsen/angular_scholarly_fs/backend/showCase')));


// Connecting to backend images for display


app.use((req, res, next) => {
   res.setHeader( "Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type: 'multipart/form-data', Accept, Authorization");
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
   next();
});

app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);



/**
 * Routes Definitions
 */
 app.get("/", (req, res) => {
   res.status(200).send("Hello World");
})







/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
 })


// Express

// Change port to azure or Heroku...
const routes = require('./backend/api');
const req = require('express/lib/request');
const res = require('express/lib/response');

app.use(express.static(path.join(__dirname, '/angular-SCHOLARLY/static')))
app.use('/api', routes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/angular-SCHOLARLY/static/index.html'))
})


module.exports = app

