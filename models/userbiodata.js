'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserBiodata.belongsTo(models.Users, { foreignKey: 'user_id' });
    }
  };
  UserBiodata.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserBiodata',
  });
  return UserBiodata;
};