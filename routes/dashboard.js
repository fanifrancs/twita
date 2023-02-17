const express = require('express'),
User          = require('../models/user'),
middlewares   = require('../middlewares'),
router        = express.Router();

router.get('/dashboard', middlewares.isLoggedIn, (req, res) => {
    User.findOne({username: req.user.username}).populate('tweets').exec((err, user) => {
        if (err) {
            res.render('error');
        } else {
            res.render('dashboard', {user});
        }
    })
})

router.get('/changepassword', middlewares.isLoggedIn, (req, res) => {
    res.render('changepassword');
})

router.post('/changepassword', middlewares.isLoggedIn, (req, res) => {
    const { oldpassword, newpassword } = req.body;
    User.findOne({username: req.user.username}, (err, user) => {
        if (err) {
            res.render('error');
        } else {
            user.changePassword(oldpassword, newpassword, (err, user) => {
                if (err) {
                    req.flash('error', err.message);
                    res.redirect('/changepassword');
                } else {
                    req.flash('success', 'Password successfully changed');
                    res.redirect('/dashboard');
                }
            })
        }
    })
})

module.exports = router;
