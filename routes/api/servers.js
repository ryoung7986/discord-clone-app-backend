const express = require("express");
const { check } = require("express-validator");
const { handleValidationErrors, asyncHandler } = require("../../utils");
const { authenticated } = require("./security-utils");
const router = express.Router();
const db = require("../../db/models");

const { Server, User, ServerUser } = db;

// router.use(authenticated);

router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const servers = await Server.findAll({
            where: {
                ownerId: req.params.id
            }
        })
        res.json(servers);
    })
)

module.exports = router;
