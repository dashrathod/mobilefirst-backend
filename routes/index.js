var express = require('express');
const { isLogin, isLogout } = require('../middleware/checkLogin');
var router = express.Router();

router.get('/dashboard', isLogin, function (req, res, next) {
    return res.render('dashboard', { title: 'Dashboard', user: req.user, "socketUrl": `http://loclhost:${process.env.PORT || 3000}` });
});

router.get('/profile', isLogin, function (req, res, next) {
    return res.render('user', { title: 'User', users: [req.user] });
});

router.get('/login', isLogout, function (req, res, next) {
    return res.render('login', { title: 'Login' });
});

router.get('/logout', isLogin, function (req, res, next) {
    req.logOut();
    return res.redirect('/login');
});

router.get('/register', isLogout, function (req, res, next) {
    return res.render('register', { title: 'Register' });
});

router.get('/', function (req, res, next) {
    return res.redirect('/dashboard');
});

router.get('/emit/:data?', function (req, res, next) {
    io_socket.emit("testing", req.params.data || ('0000' + Math.floor(Math.random() * 10000)).slice(-4));
    return res.json({});
});

module.exports = router;
