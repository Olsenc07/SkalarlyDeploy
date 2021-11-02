// Express
const express = require('express');
const app = express();
const path = require('path');
// Change port to azure or Heroku...
const port = 3000;
const router = require('./routes/api')

app.use(express.static(path.join(__dirname, '/angular-SCHOLARLY/static')))
app.use('/api', router)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/angular-SCHOLARLY/static/index.html'))
})

app.listen(port, () => {
    console.log(`Running app on localhost:${port}`)
})