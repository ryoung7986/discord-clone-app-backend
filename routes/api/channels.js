const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors, asyncHandler } = require("../../utils");
const { authenticated } = require("./security-utils");
const router = express.Router();
const db = require("../../db/models");

const { Channel, ChannelMessage } = db;

// router.use(authenticated);

router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const channels = await Channel.findAll({
            where: {
                userId: req.params.id
            }
        })
        res.json(channels);
    })
)

router.get(
    "/:id/messages",
    asyncHandler(async (req, res) => {
        const messages = await ChannelMessage.findAll({
            where: {
                channelId: req.params.id
            }
        })
        res.json(messages);
    })
)

module.exports = router;
