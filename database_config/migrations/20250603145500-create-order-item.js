'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderItems', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          // This is a reference to another model
          model: 'Orders',
          // This is the column name of the referenced model
          key: 'id',
          // This declares when to check the foreign key constraint. PostgreSQL only.
          // deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          // This is a reference to another model
          model: 'Products',
          // This is the column name of the referenced model
          key: 'id',
          // This declares when to check the foreign key constraint. PostgreSQL only.
          // deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
      },
      amount: {
        type: Sequelize.DECIMAL(38, 12),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderItems');
  }
};