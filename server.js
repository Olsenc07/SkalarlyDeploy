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
{ id: 'fsohchi1731', Title: 'I Love Scholarly',
PostDescription: 'Hey everyone come make an account. You will love it!! ',
 },
 {
     id:'vyf767trh', Title: 'Love and Live', 
     PostDescription: 'Wow I wanna share Scholaraly with everyone!'
 }
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



