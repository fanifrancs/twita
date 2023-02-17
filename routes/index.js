const express = require('express'),
middlewares   = require('../middlewares'),
router        = express.Router();

router.get('/', middlewares.isAuthorized, (req, res) => {
    res.render('register');
})

module.exports = router;
