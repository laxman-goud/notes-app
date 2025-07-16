// Middleware to check if user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        // User is logged in, allow access
        return next();
    }

    // User not authenticated, redirect to Google OAuth
    return res.redirect('/auth/google');
};