'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServerUser = sequelize.define('ServerUser', {
    userId: DataTypes.INTEGER,
    serverId: DataTypes.INTEGER
  }, {});
  ServerUser.associate = function (models) {
    ServerUser.hasMany(models.User, { foreignKey: "userId" })
    ServerUser.hasMany(models.Server, { foreignKey: "serverId" })
  };
  return ServerUser;
};
