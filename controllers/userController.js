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
            const result = await userModel.authenticate(userID, userPassword);
            if (result.isSuccess) {
                // 登入成功，設置會話
                req.session.user = result.user; // 使用會話
                req.session.cart = [];
                res.redirect('/'); // 成功後重定向到首頁
            } else {
                // 登入失敗，渲染相同的登入頁面並顯示錯誤消息
                return this.renderWithDefaults(res, 'login', { error: 'Invalid user account or password!' });
            }
        } catch (err) {
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
            const result = await userModel.insertUser(userID, userPassword, userEmail, userRole);
            this.renderWithDefaults(res, 'login', { success: 'User account created successfully!' });
        } catch (err) {
            if (err.code === 11000) { // 重複鍵錯誤
                if ('userID' in err.errorResponse.keyPattern) {
                    this.renderWithDefaults(res, 'signup', { error: 'User ID already exists!' });
                } else if ('userEmail' in err.errorResponse.keyPattern) {
                    this.renderWithDefaults(res, 'signup', { error: 'User email already exists!' });
                }
            } else {
                this.renderWithDefaults(res, 'signup', { error: 'An error occurred!' });
            }
        }
    }

}

module.exports = new UserController();