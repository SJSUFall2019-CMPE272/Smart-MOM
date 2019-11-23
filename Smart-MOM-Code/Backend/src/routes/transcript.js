var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../models/users');
var Transcripts = require('../models/transcripts');

router.route('/createsummary').post(function(req, res){
    console.log("Inside Load Transcript");

    var data = {
        username: req.body.username,
        text: req.body.text
    }

    Transcripts.create(data, (err, result) => {
        if (err) {
            console.log("unable to insert into database", err);
            res.status(401).send({responseMessage: err});
        } else {
            console.log("Transcript added");
            console.log(result);
            console.log("Transcript ID is: " + result._id);
            res.status(200).send({responseMessage: result})
        }
    })

})

module.exports = router;