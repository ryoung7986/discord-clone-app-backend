'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    serverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    channelName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
  }, {});
  Channel.associate = function (models) {
    Channel.hasMany(models.ChannelMessage, { foreignKey: "channelId" })
    Channel.belongsTo(models.Server, { foreignKey: "serverId" })
  };
  return Channel;
};
