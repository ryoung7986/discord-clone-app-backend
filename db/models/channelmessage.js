'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChannelMessage = sequelize.define('ChannelMessage', {
    message: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    channelId: DataTypes.INTEGER
  }, {});
  ChannelMessage.associate = function (models) {
    ChannelMessage.belongsTo(models.Channel, { foreignKey: "channelId" })
    ChannelMessage.belongsTo(models.User, { foreignKey: "userId" })
  };
  return ChannelMessage;
};
