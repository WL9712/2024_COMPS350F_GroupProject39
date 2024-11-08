const UserModel = require('../models/userModel');

class userController {
    // 渲染登入頁面
    async renderLogin(req, res) {
        // 傳遞 error 變量，如果沒有錯誤則為 undefined
        res.render('login', { error: undefined });
    }

    // 登入功能
    async login(req, res) {
        const { userName, userPassword } = req.body;
        const user = await UserModel.findUserByUserName(userName);
        console.log(user);

        if (!user || user.userPassword !== userPassword) {
            // 登入失敗，渲染相同的登入頁面並顯示錯誤消息
            return res.render('login', { error: 'Invalid username or password!' });
        }

        // 登入成功，設置會話
        req.session.userId = user.userName; // 使用會話
        res.redirect('/'); // 成功後重定向到首頁
    }

    // 登出功能
    async logout(req, res) {
        req.session = null;
        res.redirect('/'); // 登出後重定向到登入頁面

    }

}

module.exports = new userController();