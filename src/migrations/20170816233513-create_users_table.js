'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('users', { 
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      uuid: {
          type: Sequelize.UUID,
          allowNull: false,
      },
      name: {
          type: Sequelize.STRING(255),
          allowNull: false,
      },
      email: {
          type: Sequelize.STRING(255),
          allowNull: false,
      },
      password: {
          type: Sequelize.STRING(63),
          allowNull: false,
      },
      created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
      },
      updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
      },
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
