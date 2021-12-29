// SERVER

// server.js

/**
 * Required External Modules
 */
 const express = require('express');
 const bodyParser = require('body-parser')
 const path = require('path');
/**
 * App Variables
 */
 const app = express();
 const port = 3000;
/**
 *  App Configuration
 */

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
{ id: 'fsohchi1731', Title: 'I Love Scholarly',
PostDescription: 'Hey everyone come make an account. You will love it!! ',
 },
 {
     id:'vyf767trh', Title: 'Love and Live', 
     PostDescription: 'Wow I wanna share Scholaraly with everyone!'
 },
 {
    id:'jhvew87', Title: 'Join US', LocationEvent: 'Queens Park',
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



