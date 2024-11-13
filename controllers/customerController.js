const CustomerModel = require('../models/customerModel');
const RestaurantModel = require('../models/restaurantModel');

class AdminController {
    async renderWithDefaults(req, res, view, options = {}) {
        let user = req.session.user;
        let restaurantsList = undefined;
        let error = undefined;
        const restaurantModel = new RestaurantModel();
        try {
            restaurantsList = await restaurantModel.findAllRestaurant();
        } catch (err) {
            error = 'An error occurred while fetching restaurant data';
        }
        
        const defaults = {
            error: undefined,
            success: undefined, 
            user: user,
            restaurantsList: restaurantsList,
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