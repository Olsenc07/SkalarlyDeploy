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


//  Socket.io
const server =  http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)
// Run when client connect
io.on('connection', socket => {
   console.log("New Connection");

//    to the one user
   socket.emit('message', 'Welcome to Chat Cord!',' User joined chat');

//    Broadcase when a user connects
// to all but the poster
// socket.broadcast.emit() 

// runs when client disconnect
socket.on('disconnect', () => {
    io.emit('message', 'user left chat')
})

// Listen for chatMessage
socket.on('chatMessage', msg => {
    console.log(msg)
    io.emit('message', msg);
})
});


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
app.use('/user', express.static(path.join('/Users/chaseolsen/angular_scholarly_fs/backend/profilePics')));


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



// Profile-Reccomend_request cards
app.get("/api/profiles", (req, res, next) => {
    // Dummy Profiles
    const profiles = [
        {
            Name:'Chase Olsen', Major:'Physics and Math', Minor: 'History and Philosophy of Science',
            Sport:'Mens Varsity Hockey', Club:'Chess'
        },
        {
            Name:'Erika Olsen', Major:'Biology', Minor: 'Accounting',
            Sport:'Womens Varsity Basketball', Club: 'Best Sister Club'
        },
        {
            Name:'Wally Foss', Major:'Business', Minor: 'Rhetoric',
             Club:'Clash Royal Club'
        },
        {
            Name:'Alicia Ehret', Major:'Sport and Rec Management', Minor: 'Management and Physical Literacy',
            Sport:'Womens Varsity Basketball'
        },

        {
            Name:'Austin Ehret', Major:'Skills Coach', Minor: 'Electrician',
            Sport:'Olds Grizzlys', Club:'Huge horn club'
        },
    ];
    res.status(200).json({
        message: 'Profiles fetched succesfully!',
        profiles: profiles
    });
});




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

