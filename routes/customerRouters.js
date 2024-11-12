const express = require('express');
const customerController = require('../controllers/customerController');

const router = express.Router();

router.get('/browseMenu', (req, res) => customerController.renderBrowseMenu(req, res));

module.exports = router;
