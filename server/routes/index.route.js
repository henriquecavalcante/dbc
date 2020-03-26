const express = require('express');
const cityRoutes = require('./city.route');

const router = express.Router(); // eslint-disable-line new-cap

router.use('/city', cityRoutes);

module.exports = router;
