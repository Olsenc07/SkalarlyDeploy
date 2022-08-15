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
 const server = http.createServer(app)
 const port = 3000;


//  Socket.io 

/**
 * Server Activation
 */

 server.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
})
const io = require('socket.io')(server);


io.on('connection', (socket) => {
 console.log('Cowboys')
 socket.on('chat-message', (message) => {
  console.log('message' + message)
 })


 socket.on('chat-message', (message) => {
    console.log('wild', message);
 })
});


io.on('connection', (socket) => {
    console.log('wildin out');
socket.emit('chat-message', 'hey yall' )
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









// Express

// Change port to azure or Heroku...
const routes = require('./backend/api');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { Socket } = require('socket.io');

app.use(express.static(path.join(__dirname, '/angular-SCHOLARLY/static')))
app.use('/api', routes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/angular-SCHOLARLY/static/index.html'))
})


module.exports = app

