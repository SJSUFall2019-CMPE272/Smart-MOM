var express = require('express');
var pool = require('../helpers/pool');
var router = express.Router();
var encrypt = require('../helpers/passwordEncryption');
var jwt = require('jsonwebtoken');

router.route('/signup').post(function(req, res){
        
})

router.route('/login').post((req, res) => {
    
});

module.exports = router;