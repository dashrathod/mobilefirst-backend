module.exports = {
    isLogin: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            return res.redirect('/login');
        }
    },
    isLogout: (req, res, next) => {
        if (!req.isAuthenticated()) {
            next();
        } else {
            return res.redirect('/dashboard');
        }
    }
}