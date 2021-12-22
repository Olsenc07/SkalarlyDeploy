const router = require('express').Router();


// One function
router.get('/someData', (req, res, next) => {
    //call database here and get data
    //after you get data, send it back with res.send()
    res.send({authenticated: true})
    //catch any errors, and if you find any call next()
})



















module.exports = router;