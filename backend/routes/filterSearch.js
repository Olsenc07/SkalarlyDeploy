const express = require('express');

const router = express.Router();
const UserInfo = require('/app/backend/models/userInfo');


// userInfo by name
router.get("/filterSearchName", async(req, res) => {
    const name = req.query.name;
    console.log('name', name);
// Just name
    await UserInfo.find({ name: {
        $regex: new RegExp('.*' + name + '.*',
            'i')
    }
    })
    .limit(30)
      .then(documents => {
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
        $regex: new RegExp('.*' + major + '.*',
            'i')
    }
    }).limit(30) 
     .then(documents => {
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
        $regex: new RegExp('.*' + minor + '.*',
            'i')
    }
    }).limit(30)
      .then(documents => {
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
        $regex: new RegExp('.*' + sport + '.*',
            'i')
    }
    }).limit(30)
      .then(documents => {
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
        $regex: new RegExp('.*' + club + '.*',
            'i')
    }
    }).limit(30)
      .then(documents => {
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
// userInfo by name and major
router.get("/filterSearchNameMajor", async(req, res) => {
    const name = req.query.name;
    const major = req.query.major;
    console.log('major', major);
    console.log('name', name);

    await UserInfo.find({ 
        $and:[{
        name: {
        $regex: new RegExp('.*' + name + '.*',
            'i')
    }},
   { major: {
        $regex: new RegExp('^' + major + '.*',
            'i')
    }}
 ]}).limit(30)
      .then(documents => {
        console.log('major and name momma', documents)
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
// userInfo by name and minor
router.get("/filterSearchNameMinor", async(req, res) => {
    const name = req.query.name;
    const minor = req.query.minor;
    console.log('minor', minor);
    console.log('name', name);

    await UserInfo.find({ 
        $and:[{
            name: {
        $regex: new RegExp('.*' + name + '.*',
            'i')
    },
    minor: {
        $regex: new RegExp('.*' + minor + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('name and minor momma', documents)
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
// userInfo by name and sport
router.get("/filterSearchNameSport", async(req, res) => {
    const name = req.query.name;
    const sport = req.query.sport;
    console.log('sport', sport);
    console.log('name', name);

    await UserInfo.find({ 
        $and:[{
            name: {
        $regex: new RegExp('.*' + name + '.*',
            'i')
    },
    sport: {
        $regex: new RegExp('.*' + sport + '.*',
            'i')
    }
}]  }).limit(30)
      .then(documents => {
        console.log('name and sport momma', documents)
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
// userInfo by name and club
router.get("/filterSearchNameClub", async(req, res) => {
    const name = req.query.name;
    const club = req.query.club;
    console.log('club', club);
    console.log('name', name);

    await UserInfo.find({ 
        $and:[{
            name: {
        $regex: new RegExp('.*' + name + '.*',
            'i')
    },
    club: {
        $regex: new RegExp('.*' + club + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('name and club momma', documents)
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
// userInfo by major and sport
router.get("/filterSearchMajorSport", async(req, res) => {
    const major = req.query.major;
    const sport = req.query.sport;
    console.log('major', major);
    console.log('sport', sport);

    await UserInfo.find({
        $and:[{ major: {
        $regex: new RegExp('.*' + major + '.*',
            'i')
    },
    sport: {
        $regex: new RegExp('.*' + sport + '.*',
            'i')
    }
}]
    }).limit(30)
     .then(documents => {
        console.log('major and sport momma', documents)
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
// userInfo by major and club
router.get("/filterSearchMajorClub", async(req, res) => {
    const major = req.query.major;
    const club = req.query.club;
    console.log('major', major);
    console.log('club', club);

    await UserInfo.find({
        $and:[{ major: {
        $regex: new RegExp('.*' + major + '.*',
            'i')
    },
    club: {
        $regex: new RegExp('.*' + club + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('major and club momma', documents)
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
// userInfo by minor and club
router.get("/filterSearchMinorClub", async(req, res) => {
    const minor = req.query.minor;
    const club = req.query.club;
    console.log('minor', minor);
    console.log('club', club);

    await UserInfo.find({
        $and:[{ minor: {
        $regex: new RegExp('.*' + minor + '.*',
            'i')
    },
    club: {
        $regex: new RegExp('.*' + club + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('minor and club momma', documents)
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
// userInfo by sport and club
router.get("/filterSearchSportClub", async(req, res) => {
    const sport = req.query.sport;
    const club = req.query.club;
    console.log('sport', sport);
    console.log('club', club);

    await UserInfo.find({ 
        $and:[{ sport: {
        $regex: new RegExp('.*' + sport + '.*',
            'i')
    },
    club: {
        $regex: new RegExp('.*' + club + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('sport and club momma', documents)
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
// userInfo by sport and minor
router.get("/filterSearchSportMinor", async(req, res) => {
    const minor = req.query.minor;
    const club = req.query.club;
    console.log('minor', minor);
    console.log('club', club);

    await UserInfo.find({  $and:[{
         minor: {
        $regex: new RegExp('.*' + minor + '.*',
            'i')
    },
    club: {
        $regex: new RegExp('.*' + club + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('sport and club momma', documents)
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
// userInfo by major and minor
router.get("/filterSearchMajorMinor", async(req, res) => {
    const minor = req.query.minor;
    const major = req.query.major;
    console.log('minor', minor);
    console.log('major', major);

    await UserInfo.find({ $and:[{
         minor: {
        $regex: new RegExp('.*' + minor + '.*',
            'i')
    },
    major: {
        $regex: new RegExp('.*' + major + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('sport and club momma', documents)
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
// userInfo by major and minor and name
router.get("/filterSearchNameMajorMinor", async(req, res) => {
    const minor = req.query.minor;
    const name = req.query.name;

    const major = req.query.major;
    console.log('minor', minor);
    console.log('major', major);

    await UserInfo.find({ $and:[{
         minor: {
        $regex: new RegExp('.*' + minor + '.*',
            'i')
    },
    major: {
        $regex: new RegExp('.*' + major + '.*',
            'i')
    },
    name: {
        $regex: new RegExp('.*' + name + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('major,minor,name momma', documents)
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
// userInfo by major and minor and sport
router.get("/filterSearchSportMajorMinor", async(req, res) => {
    const minor = req.query.minor;
    const sport = req.query.sport;

    const major = req.query.major;
    console.log('minor', minor);
    console.log('major', major);

    await UserInfo.find({ $and:[{
         minor: {
        $regex: new RegExp('.*' + minor + '.*',
            'i')
    },
    major: {
        $regex: new RegExp('.*' + major + '.*',
            'i')
    },
    sport: {
        $regex: new RegExp('.*' + sport + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('sport,major,minor momma', documents)
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
// userInfo by club and minor and sport
router.get("/filterSearchSportClubMinor", async(req, res) => {
    const minor = req.query.minor;
    const sport = req.query.sport;

    const club = req.query.club;
    console.log('minor', minor);
    console.log('sport', sport);
    console.log('club', club);


    await UserInfo.find({ $and:[{ minor: {
        $regex: new RegExp('.*' + minor + '.*',
            'i')
    },
    club: {
        $regex: new RegExp('.*' + club + '.*',
            'i')
    },
    sport: {
        $regex: new RegExp('.*' + sport + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('sport,club,minor momma', documents)
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
// userInfo by major and name and sport
router.get("/filterSearchMajorClubName", async(req, res) => {
    const major = req.query.major;
    const name = req.query.name;

    const club = req.query.club;
    console.log('club', club);
    console.log('major', major);

    await UserInfo.find({ $and:[{ major: {
        $regex: new RegExp('.*' + major + '.*',
            'i')
    },
    club: {
        $regex: new RegExp('.*' + club + '.*',
            'i')
    },
    name: {
        $regex: new RegExp('.*' + name + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('name,major,club momma', documents)
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

// userInfo by club and name and sport
router.get("/filterSearchSportClubName", async(req, res) => {
    const sport = req.query.sport;
    const name = req.query.name;

    const club = req.query.club;
    console.log('club', club);
    console.log('sport', sport);
    console.log('name', name);

    await UserInfo.find({ $and:[{ sport: {
        $regex: new RegExp('.*' + sport + '.*',
            'i')
    },
    club: {
        $regex: new RegExp('.*' + club + '.*',
            'i')
    },
    name: {
        $regex: new RegExp('.*' + name + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('name,major,club momma', documents)
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
// userInfo by major and name and sport
router.get("/filterSearchSportMajorName", async(req, res) => {
    const sport = req.query.sport;
    const name = req.query.name;

    const major = req.query.major;
    console.log('major', major);
    console.log('sport', sport);
    console.log('name', name);

    await UserInfo.find({ $and:[{ sport: {
        $regex: new RegExp('.*' + sport + '.*',
            'i')
    },
    major: {
        $regex: new RegExp('.*' + major + '.*',
            'i')
    },
    name: {
        $regex: new RegExp('.*' + name + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('name,major,sport momma', documents)
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
// userInfo by minor and name and sport
router.get("/filterSearchSportMinorName", async(req, res) => {
    const sport = req.query.sport;
    const name = req.query.name;

    const minor = req.query.minor;
    console.log('minor', minor);
    console.log('sport', sport);
    console.log('name', name);

    await UserInfo.find({ $and:[{
         sport: {
        $regex: new RegExp('.*' + sport + '.*',
            'i')
    },
    minor: {
        $regex: new RegExp('.*' + minor + '.*',
            'i')
    },
    name: {
        $regex: new RegExp('.*' + name + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('name,minor,sport momma', documents)
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
// userInfo by minor and name and club
router.get("/filterSearchClubMinorName", async(req, res) => {
    const club = req.query.club;
    const name = req.query.name;

    const minor = req.query.minor;
    console.log('minor', minor);
    console.log('club', club);
    console.log('name', name);

    await UserInfo.find({ $and:[{ club: {
        $regex: new RegExp('.*' + club + '.*',
            'i')
    },
    minor: {
        $regex: new RegExp('.*' + minor + '.*',
            'i')
    },
    name: {
        $regex: new RegExp('.*' + name + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('name,minor,club momma', documents)
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
// userInfo by major,sport,clbu
router.get("/filterSearchMajorSportClub", async(req, res) => {
    const club = req.query.club;
    const sport = req.query.sport;

    const major = req.query.major;
    console.log('major', major);
    console.log('club', club);
    console.log('sport', sport);

    await UserInfo.find({ $and:[{ club: {
        $regex: new RegExp('.*' + club + '.*',
            'i')
    },
    major: {
        $regex: new RegExp('.*' + major + '.*',
            'i')
    },
    sport: {
        $regex: new RegExp('.*' + sport + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('major,sport,club momma', documents)
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
// userInfo by major,minor,club
router.get("/filterSearchMajorMinorClub", async(req, res) => {
    const club = req.query.club;
    const minor = req.query.minor;

    const major = req.query.major;
    console.log('major', major);
    console.log('club', club);
    console.log('minor', minor);

    await UserInfo.find({ $and:[{ club: {
        $regex: new RegExp('.*' + club + '.*',
            'i')
    },
    major: {
        $regex: new RegExp('.*' + major + '.*',
            'i')
    },
    minor: {
        $regex: new RegExp('.*' + minor + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('major,sport,club momma', documents)
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
// userInfo by name,major,minor,sport
router.get("/filterSearchNameMajorMinorSport", async(req, res) => {
    const sport = req.query.sport;
    const name = req.query.name;

    const minor = req.query.minor;

    const major = req.query.major;
    console.log('major', major);
    console.log('sport', sport);
    console.log('name', name);

    console.log('minor', minor);

    await UserInfo.find({ $and:[{
         sport: {
        $regex: new RegExp('.*' + sport + '.*',
            'i')
    },
    major: {
        $regex: new RegExp('.*' + major + '.*',
            'i')
    },
    minor: {
        $regex: new RegExp('.*' + minor + '.*',
            'i')
    },
    name: {
        $regex: new RegExp('.*' + name + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('name,major,minor,sport momma', documents)
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
// userInfo by name,major,minor,sport
router.get("/filterSearchMajorMinorSportClub", async(req, res) => {
    const sport = req.query.sport;
    const club = req.query.club;

    const minor = req.query.minor;

    const major = req.query.major;
    console.log('major', major);
    console.log('club', club);
    console.log('sport', sport);

    console.log('minor', minor);

    await UserInfo.find({ $and:[{ sport: {
        $regex: new RegExp('.*' + sport + '.*',
            'i')
    },
    major: {
        $regex: new RegExp('.*' + major + '.*',
            'i')
    },
    minor: {
        $regex: new RegExp('.*' + minor + '.*',
            'i')
    },
    club: {
        $regex: new RegExp('.*' + club + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('club,major,minor,sport momma', documents)
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
// userInfo by name,major,minor,sport
router.get("/filterSearchNameMinorSportClub", async(req, res) => {
    const sport = req.query.sport;
    const club = req.query.club;

    const minor = req.query.minor;

    const name = req.query.name;
    console.log('name', name);
    console.log('club', club);
    console.log('sport', sport);

    console.log('minor', minor);

    await UserInfo.find({ $and:[{ sport: {
        $regex: new RegExp('.*' + sport + '.*',
            'i')
    },
    name: {
        $regex: new RegExp('.*' + name + '.*',
            'i')
    },
    minor: {
        $regex: new RegExp('.*' + minor + '.*',
            'i')
    },
    club: {
        $regex: new RegExp('.*' + club + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('name,minor,sport,club momma', documents)
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
// userInfo by name,major,minor,major
router.get("/filterSearchNameMajorMinorClub", async(req, res) => {
    const major = req.query.major;
    const club = req.query.club;

    const minor = req.query.minor;

    const name = req.query.name;
    console.log('name', name);
    console.log('club', club);
    console.log('major', major);

    console.log('minor', minor);

    await UserInfo.find({ $and:[{ major: {
        $regex: new RegExp('.*' + major + '.*',
            'i')
    },
    name: {
        $regex: new RegExp('.*' + name + '.*',
            'i')
    },
    minor: {
        $regex: new RegExp('.*' + minor + '.*',
            'i')
    },
    club: {
        $regex: new RegExp('.*' + club + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('name,minor,major,club momma', documents)
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
// userInfo by name,major,sport,major
router.get("/filterSearchNameMajorSportClub", async(req, res) => {
    const major = req.query.major;
    const club = req.query.club;

    const sport = req.query.sport;

    const name = req.query.name;
    console.log('name', name);
    console.log('club', club);
    console.log('sport', sport);

    console.log('sport', sport);

    await UserInfo.find({ $and:[{ major: {
        $regex: new RegExp('.*' + major + '.*',
            'i')
    },
    name: {
        $regex: new RegExp('.*' + name + '.*',
            'i')
    },
    sport: {
        $regex: new RegExp('.*' + sport + '.*',
            'i')
    },
    club: {
        $regex: new RegExp('.*' + club + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('name,minor,major,club momma', documents)
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
// userInfo by name,major, minor,sport,major
router.get("/filterSearchNameMajorMinorSportClub", async(req, res) => {
    const major = req.query.major;
    const minor = req.query.minor;

    const club = req.query.club;

    const sport = req.query.sport;

    const name = req.query.name;
    console.log('name', name);
    console.log('major', major);
    console.log('minor', minor);

    console.log('club', club);
    console.log('sport', sport);



    await UserInfo.find({ $and:[{ major: {
        $regex: new RegExp('.*' + major + '.*',
            'i')
    },
    minor: {
        $regex: new RegExp('.*' + minor + '.*',
            'i')
    },
    name: {
        $regex: new RegExp('.*' + name + '.*',
            'i')
    },
    sport: {
        $regex: new RegExp('.*' + sport + '.*',
            'i')
    },
    club: {
        $regex: new RegExp('.*' + club + '.*',
            'i')
    }
}]
    }).limit(30)
      .then(documents => {
        console.log('name,minor,major,club momma', documents)
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

