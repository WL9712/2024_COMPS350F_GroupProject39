const express = require('express');
const restaurantController = require('../controllers/restaurantController');

const router = express.Router();

// 登入功能頁面路由
router.get('/registerRestaurant', (req, res) => restaurantController.renderRegisterRestaurant(req, res));

router.post('/registerRestaurant', (req, res) => restaurantController.registerRestaurant(req, res));

// 登入功能路由 (通過 login.ejs 中的表格調用)
router.post('/login', (req, res) => userController.login(req, res));


module.exports = router;
