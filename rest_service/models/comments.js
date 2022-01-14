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
    static associate(models) {
      // define association here
      this.belongsTo(Movies, {foreignKey: 'director_id', as: 'director'});
      this.belongsTo(Users, {foreignKey: 'director_id', as: 'director'});
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
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};
