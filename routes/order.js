var express = require('express');
// const { isLogin, isLogout } = require('../middleware/checkLogin');
const { createOrder, updateOrder, listOrder } = require('../controllers/OrderController');
const { createOrderValidation, updateOrderValidation, listOrderValidation } = require('../middleware/orderValidation');
var router = express.Router();

router.post('/create-order', [createOrderValidation], createOrder);
router.post('/update-order', [updateOrderValidation], updateOrder);
router.post('/list-order', [listOrderValidation], listOrder);

module.exports = router;
