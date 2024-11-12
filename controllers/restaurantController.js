const RestaurantModel = require('../models/restaurantModel');

class RestaurantController {
    // 定義 renderWithDefaults 函數
    async renderWithDefaults(res, view, options = {}) {
        const restaurantModel = new RestaurantModel();
        const restaurantList = await restaurantModel.findAllRestaurant().catch(err => {
            // console.error(debugLogheader("RestaurantController.renderWithDefaults()") + err);
            return res.render(view, { result: 'An error occurred!' });
        });
        const defaults = {
            error: undefined,
            success: undefined,
            restaurantList: restaurantList,
        };
        const renderOptions = { ...defaults, ...options };
        res.render(view, renderOptions);
    }

    // 渲染頁面
    async renderRegisterRestaurant(req, res) {
        await this.renderWithDefaults(res, 'registerRestaurant');
    }

    // 註冊餐廳功能
    async registerRestaurant(req, res) {
        const { restaurantName, restaurantCity, restaurantStreet } = req.body;
        const restaurantModel = new RestaurantModel();
        try {
            const result = await restaurantModel.insertRestaurant(restaurantName, null, { city: restaurantCity, street: restaurantStreet }, { ownerUserID: req.session.user.userID, ownerEmail: req.session.user.userEmail });
            await this.renderWithDefaults(res, 'registerRestaurant', { success: "success to register" });
        } catch (err) {
            await this.renderWithDefaults(res, 'registerRestaurant', { error: 'An error occurred!' });
        }
    }

    async renderInsertMeun(req, res) {
        await this.renderWithDefaults(res, 'insertMenu');
    }

    async insertMenu(req, res) {
        const { restaurantName, menuItemName, menuItemPrice } = req.body;
        if (!req.file) {
            return this.renderWithDefaults(res, 'insertMenu', { error: 'File upload is required!' });
        }
        const filename = req.file.filename,
            contentType = req.file.mimetype,
            filePath = req.file.path;
        const restaurantModel = new RestaurantModel();
        try {
            const result = await restaurantModel.insertMenuItemByRestaurantName(restaurantName, menuItemName, menuItemPrice, { filename, filePath, contentType });
            await this.renderWithDefaults(res, 'insertMenu', { success: 'Insert success' });
        } catch (err) {
            await this.renderWithDefaults(res, 'insertMenu', { error: 'An error occurred!' });
        }
    }
}

module.exports = new RestaurantController();