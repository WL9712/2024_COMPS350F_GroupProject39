const customerModel = require('../models/customerModel');

class AdminController {
    async renderWithDefaults(req, res, view, options = {}) {
        let user = req.session.user;
        
        const defaults = {
            error: undefined,
            success: undefined, 
            user: user,
        };
        const renderOptions = { ...defaults, ...options };
        res.render(view, renderOptions);
    }


    // 渲染頁面
    async renderBrowseMenu(req, res,) {
        await this.renderWithDefaults(req, res, 'browseMenu');
        
    }

}

module.exports = new AdminController();