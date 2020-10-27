'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.hasMany(models.DirectMessage, { foreignKey: 'senderId' })
    User.hasMany(models.DirectMessage, { foreignKey: 'recipientId' })
    User.hasMany(models.ServerUser, { foreignKey: 'userId' })
  };
  return User;
};
