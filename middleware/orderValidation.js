const {
    body,
    check,
    validationResult
} = require('express-validator');
const Op = DB.Sequelize.Op;
module.exports = {
    createOrderValidation: async function (req, res, next) {
        try {
            await check('userId', 'Invalid userId').notEmpty().isInt().toInt().run(req);

            await check('totalAmount', 'Invalid totalAmount').notEmpty().isNumeric().trim().escape().run(req);

            await check('items', 'Invalid items').notEmpty().isString().run(req);
            // .custom((items) => {
            //     if (!items.every(Number.isInteger)) {
            //         throw new Error('All items must be integers');
            //     }
            //     return true;
            // })

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
    updateOrderValidation: async function (req, res, next) {
        try {
            await check('orderId', 'Invalid orderD').notEmpty().isInt().toInt().run(req);

            await check('status', 'Invalid status').notEmpty().isString().isIn(['pending', 'cancelled', 'processing', 'shipped', 'delivered']).run(req);
            
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
    listOrderValidation: async function (req, res, next) {
        try {
            await check('limit').not().isEmpty().withMessage('Limit should not be empty.').trim().escape()
                .isInt({ gt: 0, lt: 501, allow_leading_zeroes: false }).withMessage('It should contain numeric values only and beetween 1-500 and Not Allow Leading Zeros.')
                .matches(/^[0-9]+$/).withMessage('It should contain numeric values only').toInt().run(req);

            await check('page', 'Invalid page').not().isEmpty().withMessage('Page Number should not be empty.').trim().escape()
                .isInt({ gt: 0, allow_leading_zeroes: false }).withMessage('It should contain numeric values only and greater than 1 and Not Allow Leading Zeros.')
                .matches(/^[0-9]+$/).withMessage('It should contain numeric values only').run(req);

            await check('search').optional().run(req);

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