const express = require('express');
const customerController = require('../controllers/customerController');

const router = express.Router();

router.get('/browseMenu', (req, res) => customerController.renderBrowseMenu(req, res));

router.post('/addToCart', (req, res) => customerController.addToCart(req, res));

router.get('/viewCart', (req, res) => customerController.renderViewCart(req, res));

module.exports = router;
