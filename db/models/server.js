'use strict';
module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define('Server', {
    serverName: DataTypes.STRING(255),
    ownerId: DataTypes.STRING
  }, {});
  Server.associate = function (models) {
    Server.belongsToMany(models.User, { through: "ServerUsers", otherKey: "userId", foreignKey: "serverId" })
    Server.hasMany(models.Channel, { foreignKey: "serverId" })
    Server.belongsTo(models.User, { foreignKey: "ownerId" })
  };
  return Server;
};
