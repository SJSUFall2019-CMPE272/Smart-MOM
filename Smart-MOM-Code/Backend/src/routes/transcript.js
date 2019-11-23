var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../models/users');
var Transcripts = require('../models/transcripts');
var Summary = require('../models/summary');
var mongoose = require('mongoose');
const axios = require('axios');

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
            res.status(200).send({responseMessage: result}); //comment this line when below part is uncommented

            /* Uncomment below part when Python API to fetch the summary is ready */

            // var data1 = {
            //     transcriptid: result._id,
            // }

            // axios.post(/* API URL */"", data1)
            // .then(response => {
            //     if(response.status === 200){
            //         console.log("API call successful");
            //         console.log(response.data);
            //         res.status(200).send({responseMessage: response.data})
            //     } else {
            //         console.log("API call unsuccessful");
            //         res.status(401).send({responseMessage: err});
            //     }
            // })
            // .catch(err => {
            //     console.log(err);
            //     res.status(401).send({responseMessage: err});
            // })
        }
    })
})

router.route('/pastsummary').get(function(req, res){
    console.log("Inside Past Summaries API");

    var data = {
        username: req.body.username
    }

    // var data1 = {
    //     username: req.body.username,
    //     text: "This is first summary of the application",
    //     transcriptid: mongoose.Types.ObjectId("5dd93a4619677531941d6a65")
    // }

    // Summary.create(data1, (err, result) => {
    //     if (err) {
    //         console.log("unable to insert into database", err);
    //         res.status(401).send({responseMessage: err});
    //     } else {
    //         console.log("Summaries added");
    //         console.log(result);
    //         //res.status(200).send({responseMessage: result});
    //     }
    // })

    Summary.find({username : data.username}, (err, result) => {
        if (err) {
            console.log("unable to insert into database", err);
            res.status(401).send({responseMessage: err});
        } else {
            console.log("Summaries fetched");
            console.log(result);
            res.status(200).send({responseMessage: result});
        }
    })

})

module.exports = router;