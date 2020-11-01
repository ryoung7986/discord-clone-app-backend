const { Channel, ChannelMessage } = require('./db/models');
const { validationResult } = require('express-validator');


const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const addMessageToChannel = async (userName, channelId, messageContent) => {
    console.log(channelId, messageContent);
    try {
        const channel = await Channel.findByPk(channelId);
        const message = await ChannelMessage.create({
            text: messageContent,
            userName
        });
        message.setChannel(channel);
        await message.save();
        return {
            message,
            channel: await message.getChannel()
        }
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    asyncHandler,
    addMessageToChannel
};
