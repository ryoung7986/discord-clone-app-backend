'use strict';
module.exports = (sequelize, DataTypes) => {
  const DirectMessage = sequelize.define('DirectMessage', {
    senderId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {});
  DirectMessage.associate = function(models) {
    // associations can be defined here
  };
  return DirectMessage;
};