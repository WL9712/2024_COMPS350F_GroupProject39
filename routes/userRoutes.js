const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// 登入功能頁面路由
router.get('/login', (req, res) => userController.renderLogin(req, res));

// 登入功能路由 (通過 login.ejs 中的表格調用)
router.post('/login', (req, res) => userController.login(req, res));


router.post('/signup', (req, res) => userController.signup(req, res));

// 登出功能路由 (通過 index.ejs 中 button 調用)
router.get('/logout', (req, res) => userController.logout(req, res));

module.exports = router;
