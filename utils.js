const { validationResult } = require('express-validator');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

// TODO: Add any functions that can be used in multiple modules

module.exports = { asyncHandler };
