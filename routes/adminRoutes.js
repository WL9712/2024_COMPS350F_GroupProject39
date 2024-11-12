const express = require('express');
const adminController = require('../controllers/adminController');
const methodOverride = require('method-override');

const router = express.Router();

router.use(methodOverride('_method'));

router.get('/userManage', (req, res) => adminController.renderUserManage(req, res));

router.post('/userManage', (req, res) => adminController.renderUserManage(req, res));

router.post('/deleteUser', (req, res) => adminController.deleteUser(req, res));

module.exports = router;
