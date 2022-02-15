'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserHistory.belongsTo(models.Users, { foreignKey: 'user_id' });

    }
  };
  UserHistory.init({
    date: DataTypes.DATE,
    result: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserHistory',
  });
  return UserHistory;
};