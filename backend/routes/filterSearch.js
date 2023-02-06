const express = require('express');

const router = express.Router();
const UserInfo = require('/app/backend/models/userInfo');


// userInfo by name
router.get("/filterSearchName", async(req, res) => {
    const name = req.query.name;
    console.log('name', name);
// Just name
    await UserInfo.find({ name: {
        $regex: new RegExp('^' + name + '.*',
            'i')
    }
    })  .then(documents => {
        console.log('name momma', documents)
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
// userInfo by major
router.get("/filterSearchMajor", async(req, res) => {
    const major = req.query.major;
    console.log('major', major);
// Just name
    await UserInfo.find({ major: {
        $regex: new RegExp('^' + major + '.*',
            'i')
    }
    })  .then(documents => {
        console.log('major momma', documents)
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
// userInfo by minor
router.get("/filterSearchMinor", async(req, res) => {
    const minor = req.query.minor;
    console.log('minor', minor);

    await UserInfo.find({ minor: {
        $regex: new RegExp('^' + minor + '.*',
            'i')
    }
    })  .then(documents => {
        console.log('minor momma', documents)
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
// userInfo by sport
router.get("/filterSearchSport", async(req, res) => {
    const sport = req.query.sport;
    console.log('sport', sport);

    await UserInfo.find({ sport: {
        $regex: new RegExp('^' + sport + '.*',
            'i')
    }
    })  .then(documents => {
        console.log('sport momma', documents)
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
// userInfo by club
router.get("/filterSearchClub", async(req, res) => {
    const club = req.query.club;
    console.log('club', club);

    await UserInfo.find({ club: {
        $regex: new RegExp('^' + club + '.*',
            'i')
    }
    })  .then(documents => {
        console.log('club momma', documents)
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
module.exports = router;

