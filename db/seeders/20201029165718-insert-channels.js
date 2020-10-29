'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Channels', [
      { serverId: 1, userId: 1, channelName: 'Lets talk about things', createdAt: new Date(), updatedAt: new Date() },
      { serverId: 1, userId: 1, channelName: 'Lets not talk about the same things', createdAt: new Date(), updatedAt: new Date() },
      { serverId: 2, userId: 1, channelName: 'where is everybody?', createdAt: new Date(), updatedAt: new Date() }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Channels', null, {});
  }
};
