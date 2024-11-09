const RestaurantModel = require('../models/restaurantModel');

class RestaurantController {

    // 渲染頁面
    async renderRegisterRestaurant(req, res) {
        res.render('registerRestaurant', { result: undefined });
    }

    // 登入功能
    async registerRestaurant(req, res) {
        const { restaurantName, restaurantCity, restaurantStreet } = req.body;
        console.log(debugLogheader("RestaurantController.registerRestaurant()") + `restaurantName: ${restaurantName}, restaurantCity: ${restaurantCity}, restaurantStreet: ${restaurantStreet}`);
        const restaurantModel = new RestaurantModel();
        try {
            const result = await restaurantModel.insertRestaurant(restaurantName, null, { city: restaurantCity, street: restaurantStreet });
            console.log(debugLogheader("RestaurantController.registerRestaurant()") + result);
            res.render('registerRestaurant', { result: result });
        } catch (err) {
            console.error(debugLogheader("RestaurantController.registerRestaurant()") + err);
            res.render('registerRestaurant', { result: 'An error occurred!' });
        }
    }
}

module.exports = new RestaurantController();