// index.js

/**
 * Required External Modules
 */
 const express = require('express');
 const path = require('path');
/**
 * App Variables
 */
 const app = express();
 const port = 3000;
/**
 *  App Configuration
 */

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
const http = require('http')
// Change port to azure or Heroku...

const router = require('./routes/api')

app.use(express.static(path.join(__dirname, '/angular-SCHOLARLY/static')))
app.use('/api', router)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/angular-SCHOLARLY/static/index.html'))
})



