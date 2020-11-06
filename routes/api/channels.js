const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors, asyncHandler } = require("../../utils");
const { authenticated } = require("./security-utils");
const router = express.Router();
const db = require("../../db/models");

const { Channel, ChannelMessage } = db;

// router.use(authenticated);

router.get(
    "/:channelId",
    asyncHandler(async (req, res) => {
        const channels = await Channel.findAll({
            where: {
                userId: req.params.channelId
            }
        })
        res.json(channels);
    })
)

router.get(
    "/:channelId/messages",
    asyncHandler(async (req, res) => {
        const messages = await ChannelMessage.findAll({
            where: {
                channelId: req.params.channelId
            }
        })
        res.json(messages);
    })
)

router.get(
    "/:serverId",
    asyncHandler(async (req, res) => {
        const channels = await Channel.findAll({
            where: {
                serverId: req.params.serverId
            }
        })
        res.json(channels);
    })
)



module.exports = router;
