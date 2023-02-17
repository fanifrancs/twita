const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    tweets: [
    	{
    		type: mongoose.Schema.Types.ObjectId,
    		ref: 'Tweet'
    	}
    ]
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
