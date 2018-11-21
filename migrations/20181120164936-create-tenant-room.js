'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tenant_rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roomId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          mode: 'rooms',
          key: 'id'
        }
      },
      tenantId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: 'tenants',
          key: 'id'
        }
      },
      dateIn: {
        type: Sequelize.DATE
      },
      dateOut: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tenant_rooms');
  }
};