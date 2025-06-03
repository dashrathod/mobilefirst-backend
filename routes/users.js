var express = require('express');
const passport = require('passport');
const { isLogout } = require('../middleware/checkLogin');

var router = express.Router();
const UserController = require('../controllers/UserController.js');
const { loginValidation, registerValidation } = require('../middleware/userValidation.js');


router.post('/login', [loginValidation, isLogout], passport.authenticate('local', {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    // failureFlash: true,
}));

router.post('/register', [registerValidation, isLogout], UserController.userRegister);

module.exports = router;
