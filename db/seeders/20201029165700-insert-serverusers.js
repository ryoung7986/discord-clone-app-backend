'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ServerUsers', [
      { userId: 1, serverId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, serverId: 2, createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, serverId: 1, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ServerUsers', null, {});
  }
};
