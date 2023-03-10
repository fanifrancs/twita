const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content: String,
    created: {type: Date, default: Date.now},
    author : {
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments: [
    	{
    		type: mongoose.Schema.Types.ObjectId,
    		ref: 'Comment'
    	}
    ]
});

module.exports = mongoose.model('Tweet', tweetSchema);
