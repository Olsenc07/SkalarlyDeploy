// SERVER

// server.js

/**
 * Required External Modules
 */
 const express = require('express');
 const bodyParser = require('body-parser');
 const path = require('path');
 const mongoose = require('mongoose');

 const Post = require('/Users/chaseolsen/angular_scholarly_fs/backend/models/post.js');

/**
 * App Variables
 */
 const app = express();
 const port = 3000;

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

app.use((req, res, next) => {
   res.setHeader( "Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS")
   next();
});

/**
 * Routes Definitions
 */
 app.get("/", (req, res) => {
   res.status(200).send("Hello World");
})
// Post path
 app.get("/api/posts", (req, res, next) => {
   // Dummy posts
   const posts = [
    { id:'jhvew87', Title: 'Virgin Post', LocationEvent: 'My bed babe', PostLocation: 'Dentistry',
    PostDescription: 'You know whats going down!! I told you I was freaky!!', Gender: 'female', Time: '11:11 PM', Date: 'January 1, 2022',
    PaymentService: 'True', Virtual: 'True', Event: 'relaxed'
    },
{ id: 'fsohchi1731', Title: 'I Love Scholarly', PostLocation: 'Miscelaneous',
PostDescription: 'Hey everyone come make an account. You will love it!! ',
 },
 {
     id:'vyf767trh', Title: 'Love and Live', 
     PostDescription: 'Wow I wanna share Scholaraly with everyone!', PostLocation: 'Miscelaneous',
 },
 {
    id:'jhvew87', Title: 'Join US', LocationEvent: 'Queens Park', PostLocation: 'Intramural Sports',
    PostDescription: 'Touch Football', Gender: 'female'
},
{
    id:'jhvew87', Title: 'Group Cuddle', LocationEvent: 'My House', PostLocation: 'Helping Hand',
    PostDescription: 'Come be freaky', Gender: 'all', Time: '4:20 PM', Date: 'January 1, 2022',
    PaymentService: 'True', 
},
{
    id:'jhvew87', LocationEvent: 'Goldring', PostLocation: 'Varsity Sports',
    PostDescription: 'Come be loud and cheer on the mens hockey team!!!', Gender: 'all', Time: '7:30 PM', Date: 'January 4, 2022',
    PaymentService: 'True', Virtual: 'True', Event: 'relaxed'
},
{ id:'jhvew87', Title: 'Study Time', LocationEvent: 'Kelly Library', PostLocation: 'Tutoring',
PostDescription: 'Group studying for MAT 334 if you wanna come bro down and crush some numericons.', Gender: 'male', Time: '5:15 PM', Date: 'January 10, 2022',
PaymentService: 'True', Virtual: 'True', Event: 'formal', Driver: 'True',
},
];
 res.status(200).json({
     message: 'Posts fetched succesfully!',
     posts: posts
 });
});


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
            Sport:'Womens Varsity Basketball', Club:'Cutie girl club'
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


// Post requests
app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        Title: req.body.Title,
        PostDescription: req.body.PostDescription,
        PostLocation: req.body.PostLocation,
        LocationEvent: req.body.LocationEvent,
        Time: req.body.Time,
        Date: req.body.Date,
        Gender: req.body.Gender,
        Driver: req.body.Driver,
        Virtual: req.body.Virtual,
        Event: req.body.Event,
    });
    post.save();
    res.status(201).json({
        message: 'Post added successfully'
    });
});

/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
 })


// Express
// Importing using node-js
const http = require('http');
// Change port to azure or Heroku...

const routes = require('./backend/api')

app.use(express.static(path.join(__dirname, '/angular-SCHOLARLY/static')))
app.use('/api', routes)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/angular-SCHOLARLY/static/index.html'))
})



