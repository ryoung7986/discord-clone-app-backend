'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Servers', [
      { serverName: 'Super Cool Server', ownerId: 1, createdAt: new Date(), updatedAt: new Date() },
      { serverName: 'Slightly less cool but still super', ownerId: 1, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Servers', null, {});
  }
};
