const securityUtils = require('./api/security-utils');

const router = require('express').Router();

const routes = [
    'users',
    'session'
];

for (let route of routes) {
    router.use(`/api/${route}`, require(`./api/${route}`));
}

module.exports = router;
