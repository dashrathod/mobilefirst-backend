const { Op } = require('sequelize');
module.exports = {
    listOrder: async function (data) {
        try {
            let offset = (data.page - 1) * data.limit;
            let where = {};
            if (data.search) {
                where.status = { [Op.like]: `%${data.search}%` };
            }

            const result = await DB.Order.findAndCountAll({
                where,
                limit: Number(data.limit || 10),
                offset: offset,
                order: [['createdAt', 'DESC']], // Optional sorting
            });
            return result;
        }
        catch (error) {
            console.log(error);
            return ({ status: false, message: 'Something Wrong!' });
        }
    },
};