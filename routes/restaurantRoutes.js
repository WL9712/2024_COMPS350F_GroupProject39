const express = require('express');
const restaurantController = require('../controllers/restaurantController');
const upload = require('../lib/fileUploadHandler');

const router = express.Router();

// 登入功能頁面路由
router.get('/registerRestaurant', (req, res) => restaurantController.renderRegisterRestaurant(req, res));

router.post('/registerRestaurant', (req, res) => restaurantController.registerRestaurant(req, res));

router.get('/insertMenu', (req, res) => restaurantController.renderInsertMeun(req, res));

router.post('/insertMenu', upload.single('menuImage'), (req, res) => restaurantController.insertMenu(req, res));

// 登入功能路由 (通過 login.ejs 中的表格調用)
router.post('/login', (req, res) => userController.login(req, res));


module.exports = router;
