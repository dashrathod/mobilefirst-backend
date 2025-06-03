// const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports = function (passport) {

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        function (email, password, cb) {
            //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
            return DB.User.findOne({ where: { email: email } })
                .then(async user => {
                    if (!user) {
                        return cb(null, false, { message: 'Incorrect email or password.' });
                    } else if (!await user.validPassword(password)) {
                        return cb(null, false, { message: 'Incorrect email or password.' });
                    } else {
                        return cb(null, user, { message: 'Logged In Successfully' });
                    }
                })
                .catch(err => cb(err));
        }
    ));

    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.jwtSecret || 'your_jwt_secret'
    },
        function (jwtPayload, cb) {

            //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
            return DB.User.findOne({ where: { email: jwtPayload.email } })
                .then(user => {
                    return cb(null, user);
                })
                .catch(err => {
                    return cb(err);
                });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
       /*  DB.User.findOne({ where: { id: id } }, function (err, user) {
            done(err, user);
        }); */
        return DB.User.findOne({ where: { id: id } })
            .then(async user => {
                if (!user) {
                    return done(null, {});
                } else {
                    return done(null, user);
                }
            })
            .catch(err => done(err));
    });
}