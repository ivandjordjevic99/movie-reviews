'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      surname: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        isEmail:{
          msg: "Not an email"
        }
      },
      role: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};