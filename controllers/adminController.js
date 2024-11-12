const AdminModel = require('../models/adminModel');
const UserModel = require('../models/userModel');

class AdminController {
    async renderWithDefaults(req, res, view, options = {}) {
        const admin = req.session.user;
        let usersList = {};
        let error = undefined;
        const userModel = new UserModel();
        try {
            usersList = await userModel.findAllUser();
            usersList = usersList.filter(user => user.userRole !== admin.userRole);
        } catch (err) {
            console.error(err);
            error = 'An error occurred while fetching user data';
        }

        const defaults = {
            error: error,
            success: undefined,
            admin: admin,
            usersList: usersList,
        };
        const renderOptions = { ...defaults, ...options };
        res.render(view, renderOptions);
    }


    // 渲染頁面
    async renderUserManage(req, res,) {
        await this.renderWithDefaults(req, res, 'userManage');
    }

    async deleteUser(req, res) {
        if (req.body._method === 'DELETE') {
            const { userID } = req.body;
            const userModel = new UserModel();
            try {
                const result = await userModel.deleteUserByUserID(userID);
                if (result.deletedCount > 0) {
                    return await this.renderWithDefaults(req, res, 'userManage', { success: 'User deleted successfully!' });;
                    
                } else {
                    return await this.renderWithDefaults(req, res, 'userManage', { error: 'User not found!' });;
                } 
            } catch (err) {
                  return await this.renderWithDefaults(req, res, 'userManage', { error: 'An error occurred while deleting the user' });;
            }
        } else {
            return await this.renderWithDefaults(req, res, 'userManage', { error: 'Invalid request!' });;
        }
    }
}

module.exports = new AdminController();