'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( {Movies, Users}) {
      // define association here
      this.belongsTo(Movies, {foreignKey: 'movie_id', as: 'movie'});
      this.belongsTo(Users, {foreignKey: 'user_id', as: 'user'});
    }
  };
  Comments.init({
    content: {
      type: DataTypes.STRING(2048),
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};
