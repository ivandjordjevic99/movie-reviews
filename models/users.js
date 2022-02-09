'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( {Comments} ) {
      // define association here
      this.hasMany(Comments, {foreignKey: 'user_id', as: 'comments', onDelete: 'cascade', hooks: true});
    }
  };
  Users.init({
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
      isEmail:{
        msg: "Not an email"
      }
    },
    role: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};