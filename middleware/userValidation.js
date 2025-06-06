const {
    body,
    check,
    validationResult
} = require('express-validator');
const Op = DB.Sequelize.Op;
module.exports = {
    loginValidation: async function (req, res, next) {
        try {
            await check('email', 'Invalid email').notEmpty().isEmail().trim().escape().run(req);

            await check('password', 'Invalid password').isString().notEmpty().trim().escape().run(req);

            //checking validation
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({ message: errors.array()[0].param + ' : ' + errors.array()[0].msg });
            } else {
                next();
            }
        } catch (error) {
            return res.json({ message: 'server Error' });
        }
    },
    registerValidation: async function (req, res, next) {
        try {
            await check('firstName', 'Invalid firstName').isString().notEmpty().trim().escape().run(req);

            await check('lastName', 'Invalid lastName').isString().notEmpty().trim().escape().run(req);

            await check('email', 'Invalid email').notEmpty().isEmail().trim().escape().run(req);

            await check('password', 'Invalid password').isString().notEmpty().trim().escape().run(req);

            //checking validation
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({ message: errors.array()[0].param + ' : ' + errors.array()[0].msg });
            } else {
                next();
            }
        } catch (error) {
            return res.json({ message: 'server Error' });
        }
    },
}