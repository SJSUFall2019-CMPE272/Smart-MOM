var mongoose = require('mongoose');
var Schema = mongoose.Schema;

Transcripts = new Schema({
    username: {
        type: String,
        required : true
    },
    text: {
        type: String,
        required : true
    }
})

module.exports = mongoose.model('transcripts', Transcripts);