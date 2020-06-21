'use strict';
const { v4: uuid } = require('uuid');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('messages', {
      _id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      user_id: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: '_id'
        }
      },
      room_id: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: 'rooms',
          key: '_id'
        }
      },
      text: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
      video: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('messages');
  }
};