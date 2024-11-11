const RestaurantModel = require('../models/restaurantModel');

class RestaurantController {

    // 渲染頁面
    async renderRegisterRestaurant(req, res) {
        res.render('registerRestaurant', { result: undefined });
    }

    // 登入功能
    async registerRestaurant(req, res) {
        const { restaurantName, restaurantCity, restaurantStreet } = req.body;
        const restaurantModel = new RestaurantModel();
        const result = await restaurantModel.insertRestaurant(restaurantName, null, { city: restaurantCity, street: restaurantStreet }).
            catch(err => {
                console.error(debugLogheader("RestaurantController.registerRestaurant()") + err);
                res.render('registerRestaurant', { result: 'An error occurred!' });
            });
        console.log(debugLogheader("RestaurantController.registerRestaurant()") + result);
        res.render('registerRestaurant', { result: result });

    }
}

module.exports = new RestaurantController();