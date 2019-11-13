var mongoose = require('mongoose');
var Schema = mongoose.Schema;

Summary = new Schema({
    username: {
        type: String,
        required : true
    },
    transcriptid: {
        type: mongoose.Types.ObjectId,
        required : true
    },
    text: {
        type: String,
        required : true
    }
})

module.exports = mongoose.model('summary', Summary);