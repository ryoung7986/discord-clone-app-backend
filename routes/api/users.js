const express = require('express');
const UserRepository = require('../../db/user-repository')
const { User } = require('../../db/models');
const { asyncHandler } = require('../../utils');
const { authenticated, generateToken } = require('./security-utils');
const {
    handleValidationErrors,
    validateUser,
    validationResult,
} = require('../../validations');

const router = express.Router();

router.get(
    '/',
    validateUser,
    handleValidationErrors,
    asyncHandler(async (req, res) => {
        const users = await User.findAll();
        res.json(users);
    })
);

router.post(
    '/',
    validateUser,
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next({ status: 422, errors: errors.array() });
        }

        // TODO: Modify reqUser to match your User Model
        // Hint: Look at data object in ./security-utils and make sure that matches User Model
        // Hint: Update validations.js to match your User Model
        const reqUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            tokenId: ''
        }

        const user = await UserRepository.create(reqUser);

        const { jti, token } = generateToken(user);
        user.tokenId = jti;
        await user.save();
        res.json({ token, user: user.toSafeObject() });
    })
);

//* I'm not sure what this is doing, but wanted to leave it for now
// router.get('/me', authenticated, (req, res) => {
//     res.json({
//         email: req.user.email,
//         name: req.user.name,
//     });
// });

module.exports = router;
