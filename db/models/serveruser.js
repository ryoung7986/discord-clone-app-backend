'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServerUser = sequelize.define('ServerUser', {
    userId: DataTypes.INTEGER,
    serverId: DataTypes.INTEGER
  }, {});
  ServerUser.associate = function (models) {
  };
  return ServerUser;
};
