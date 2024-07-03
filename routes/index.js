const route = require('express').Router();

route.get('/', (req, res) => {
    res.success('Welcome to the Bersajak API');
});

module.exports = route;
