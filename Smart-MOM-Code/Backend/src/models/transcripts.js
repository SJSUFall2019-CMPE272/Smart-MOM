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
    },
    time : {
        type : Date,
        default : Date.now
	}
})

module.exports = mongoose.model('transcripts', Transcripts);