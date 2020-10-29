'use strict';
module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define('Server', {
    serverName: DataTypes.STRING(255)
  }, {});
  Server.associate = function (models) {
    Server.belongsToMany(models.User, { through: "ServerUser", otherKey: "userId", foreignKey: "serverId" })
    Server.hasMany(models.Channel, { foreignKey: "serverId" })
  };
  return Server;
};
