const { validationResult, check } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => error.msg);

        const err = new Error('Bad Request');
        err.status = 400;
        err.title = 'Bad Request';
        err.errors = errors;

        next(err);
    }
    next();
};

// TODO: Customize Validations for your Models... These are just placeholders!

// Validators below are being used in users.js and session.js in routes/api...

const validateEmailAndPassword = [
    check('email').isEmail().withMessage('Please provide a valid email.').normalizeEmail(),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
];

const validateUser = [
    check('userName').exists({ checkFalsy: true }).withMessage('Please provide a username'),
    ...validateEmailAndPassword,
];

module.exports = {
    validationResult,
    handleValidationErrors,
    validateEmailAndPassword,
    validateUser,
};
