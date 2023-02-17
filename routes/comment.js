const express = require('express'),
Tweet         = require('../models/tweet'),
Comment       = require('../models/comment'),
middlewares   = require('../middlewares'),
router        = express.Router();

router.post('/tweets/:id/comment', middlewares.isLoggedIn, (req, res) => {
    Tweet.findById(req.params.id, (err, tweet) => {
        if (err || tweet === null) {
            res.render('error');
        } else {
            Comment.create({comment: req.body.comment}, (err, comment) => {
                if (err) {
                    res.render('error');
                } else {
                	comment.author.id = req.user._id;
                	comment.author.username = req.user.username;
                	comment.save();
                    tweet.comments.push(comment);
                    tweet.save();
                    res.redirect('/tweets/' + tweet._id);
                }
            })
        }
    })
})

module.exports = router;
