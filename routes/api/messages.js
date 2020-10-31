const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors, asyncHandler } = require("../../utils");
const { authenticated } = require("./security-utils");
const router = express.Router();
const db = require("../../db/models");

const { ChannelMessage, User } = db;

router.use(authenticated);

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const messages = await ChannelMessage.findAll({

        })
    })
)

const validateMessage = [
    check("message")
        .exists({ checkFalsy: true })
        .withMessage("Message cannot be empty"),
    handleValidationErrors,
];

// router.post(
//     "/",
//     validateMessage,
//     asyncHandler(async (req, res) => {
//         const { messageData } = req.body;
//         const message = await ChannelMessage.create({ messageData, userId: req.user.id, serverId: req.server.id });
//         res.json({ message });
//     })
// );

module.exports = router;
