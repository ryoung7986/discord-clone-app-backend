'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServerUser = sequelize.define('ServerUser', {
    userId: DataTypes.INTEGER,
    serverId: DataTypes.INTEGER
  }, {});
  ServerUsers.associate = function (models) {
    ServerUser.belongsTo(models.User, { foreignKey: "userId" })
    ServerUser.belongsTo(models.Server, { foreignKey: "serverId" })
  };
  return ServerUser;
};
