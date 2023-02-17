const middlewares = {};

middlewares.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    };
    req.flash('error', 'Please login first');
    res.redirect('/login');
}

middlewares.isAuthorized = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/tweets');
    }; next();
}

module.exports = middlewares;
