const UserModel = require('../models/userModel');

class UserController {

    renderWithDefaults(res, view, options = {}) {
        // 定义默认值
        const defaults = {
            error: undefined,
            success: undefined,
        };
        // 合并默认值和传入的选项
        const renderOptions = { ...defaults, ...options };
        res.render(view, renderOptions);
    }

    // 渲染登入頁面
    async renderLogin(req, res) {
        this.renderWithDefaults(res, 'login');
    }

    // 登入功能
    async login(req, res) {
        const { userID, userPassword } = req.body;
        const userModel = new UserModel();
        try {
            const user = await userModel.findUserByuserID(userID);
            console.log(user);
            if (!user || user.userPassword !== userPassword) {
                // 登入失敗，渲染相同的登入頁面並顯示錯誤消息
                return this.renderWithDefaults(res, 'login', { error: 'Invalid user account or password!' });
            }

            // 登入成功，設置會話
            req.session.user = user; // 使用會話
            res.redirect('/'); // 成功後重定向到首頁
        } catch (err) {
            console.error(debugLogheader("UserController.login()") + err);
            this.renderWithDefaults(res, 'login', { error: 'An error occurred!' });
        }
    }

    // 登出功能
    async logout(req, res) {
        req.session = null;
        res.redirect('/'); // 登出後重定向到登入頁面

    }

    async renderSignup(req, res) {
        this.renderWithDefaults(res, 'signup');
    }

    async signup(req, res) {
        const { userID, userPassword, userEmail, userRole } = req.body;
        const userModel = new UserModel();
        
        try {
            // 嘗試插入用戶
            const result = await userModel.insertUser(userID, userPassword, userEmail, userRole);
            // 如果插入成功，重定向到登入頁面
            this.renderWithDefaults(res, 'login', { success: 'User account created successfully!' });
        } catch (err) {
            // 錯誤處理
            console.error(debugLogheader("UserController.signup()") + err.code);
            
            // 根據錯誤代碼進行不同的處理
            if (err.code === 11000) { // 重複鍵錯誤
                this.renderWithDefaults(res, 'signup', { error: 'User ID already exists!' });
            } else {
                this.renderWithDefaults(res, 'signup', { error: 'An error occurred!' });
            }
        }
    }
    
}

module.exports = new UserController();