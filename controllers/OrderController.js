const { listOrder } = require("../service/orderService");
var kafka = require('../config/kafka-config.js');

module.exports = {
    createOrder: async function (req, res, next) {
        try {
            //send notification to kafka
            let messageData = {
                type: "order-create",
                data: req.body
            }
            
            kafka.sendMessage(JSON.stringify(messageData));

            return res.json({
                status: true,
                msg: "order created successfully.."
            });
        }
        catch (error) {
            console.log(error);
            return ({ status: false, message: 'Something Wrong!' });
        }
    },
    updateOrder: async function (req, res, next) {
        try {
            
            //send notification to kafka
            let messageData = {
                type: "order-status-change",
                data: req.body
            }
            kafka.sendMessage(JSON.stringify(messageData));

            return res.json({
                status: true,
                msg: "order updated successfully.."
            });
        }
        catch (error) {
            console.log(error);
            return ({ status: false, message: 'Something Wrong!' });
        }
    },
    listOrder: async function (req, res, next) {
        try {
            let result = await listOrder(req.body);
            let finalData = {
                total: result.count,
                orders: result.rows,
                currentPage: req.body.page,
                totalPages: Math.ceil(result.count / req.body.limit),
            };
            return res.json({
                status: true,
                order: finalData,
                msg: "order list successfully.."
            });
        }
        catch (error) {
            console.log(error);
            return ({ status: false, message: 'Something Wrong!' });
        }
    },
};