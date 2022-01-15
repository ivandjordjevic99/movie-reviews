'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Directors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( {Movies} ) {
      // define association here
      this.hasMany(Movies, {foreignKey: 'director_id', as: 'movies', onDelete: 'cascade', hooks: true});
    }
  };
  Directors.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Directors',
  });
  return Directors;
};