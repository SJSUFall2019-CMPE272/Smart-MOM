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
    },
    time : {
        type : Date,
        default : Date.now
	}
})

module.exports = mongoose.model('summary', Summary);