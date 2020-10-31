'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ChannelMessages', [
      { message: 'yo', userId: 1, channelId: 4, createdAt: new Date(), updatedAt: new Date() },
      { message: 'what up?', userId: 2, channelId: 4, createdAt: new Date(), updatedAt: new Date() },
      { message: 'not much hbu', userId: 1, channelId: 4, createdAt: new Date(), updatedAt: new Date() },
      { message: 'just trying to figure out what im doing', userId: 2, channelId: 4, createdAt: new Date(), updatedAt: new Date() },
      { message: 'cool', userId: 1, channelId: 4, createdAt: new Date(), updatedAt: new Date() },
      { message: 'no its not', userId: 2, channelId: 4, createdAt: new Date(), updatedAt: new Date() },
      { message: 'okay fine just trying to be nice', userId: 1, channelId: 4, createdAt: new Date(), updatedAt: new Date() },
      { message: 'hello?', userId: 1, channelId: 6, createdAt: new Date(), updatedAt: new Date() },
      { message: 'i have no friends', userId: 1, channelId: 6, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ChannelMessages', null, {});
  }
};
