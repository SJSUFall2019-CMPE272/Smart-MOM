var express = require('express');
var router = express.Router();
var crypt = require('../helpers/passwordEncryption');
var passport = require('passport');


var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + ".png")
    }
});
var upload = multer({storage: storage});


router.route('/updateprofile').post(passport.authenticate('jwt', { session: false }), upload.single('imglink'), function(req, res){
    
})


router.route('/getprofile').get(passport.authenticate('jwt', { session: false }), function(req, res){
   
})

module.exports = router;