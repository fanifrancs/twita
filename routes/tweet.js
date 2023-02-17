const express = require('express'),
User          = require('../models/user'),
Tweet         = require('../models/tweet'),
middlewares   = require('../middlewares'),
router        = express.Router();

router.get('/tweets', middlewares.isLoggedIn, (req, res) => {
    Tweet.find({}, (err, tweets) => {
        if (err) {
            res.render('error');
        } else {
            res.render('tweets', {tweets});
        }
    })
})

router.get('/tweet', middlewares.isLoggedIn, (req, res) => {
    res.render('tweet');     
})

router.post('/tweet', middlewares.isLoggedIn, (req, res) => {
	const author = {
		id: req.user._id,
		username : req.user.username
	};
    Tweet.create({content: req.body.content, author}, (err, newTweet) => {
        if (err) {
            res.render('error');
        } else {
            User.findOne({username: req.user.username}, (err, user) => {
                if (err) {
                    res.render('tweet');
                } else {
                    user.tweets.push(newTweet);
                    user.save();
                }
            })
            res.redirect('/tweets');
        }
    })
})

router.get('/tweets/:id', middlewares.isLoggedIn, (req, res) => {
    Tweet.findById(req.params.id).populate('comments').exec((err, tweet) => {
        if (err || tweet === null) {
            res.render('error');
        } else {
            res.render('show', {tweet});
        }
    })
})

router.post('/tweets/:id/delete', middlewares.isLoggedIn, (req, res) => {
    Tweet.findByIdAndRemove(req.params.id, (err, tweetToBeDeleted) => {
        if (err || tweetToBeDeleted === null) {
            res.send('error');
        } else {
            res.redirect('/dashboard');
        }
    })
})

module.exports = router;
