const express = require('express');
const multer = require('multer');
const router = express.Router();
const UserInfo = require('/app/backend/models/userInfo');


// userInfo by name
router.get("/filterSearchName", async(req, res) => {
    const name = req.query.searchName;
    console.log('name', name);
// Just name
    await UserInfo.find({ name: {
        $regex: new RegExp('^' + name + '.*',
            'i')
    }
    })  .then(documents => {
        console.log('docs yo momma', documents)
        res.status(200).json({
            message: 'Filter search fetched succesfully!',
            infos: documents
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'Fetching users failed!'
        });
    });

});