'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
    },
    tokenId: {
      type: DataTypes.STRING
    }
  }, {});
  User.associate = function (models) {
    User.belongsToMany(models.Server, { through: "ServerUser", otherKey: "serverId", foreignKey: "userId" })
    User.hasMany(models.ChannelMessage, { foreignKey: "userId" })
  };

  User.prototype.isValid = () => true;

  User.prototype.setPassword = function (password) {
    this.hashedPassword = bcrypt.hashSync(password, 10);
    return this;
  };

  User.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.prototype.toSafeObject = function () {
    return {
      // createdAt: this.createdAt,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      userName: this.userName,
      // id: this.id
    }
  }

  return User;
};
