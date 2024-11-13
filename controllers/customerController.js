
const RestaurantModel = require('../models/restaurantModel');

class AdminController {
    async renderWithDefaults(req, res, view, options = {}) {
        let user = req.session.user;

        const defaults = {
            error: '',
            success: '', 
            user: user,
            restaurantsList: [],
            cart: [],
            itemTotalPrice: 0,
        };
        const renderOptions = { ...defaults, ...options };
        res.render(view, renderOptions);
    }


    // 渲染頁面
    async renderBrowseMenu(req, res, options = {}) {
        const restaurantModel = new RestaurantModel();
        let restaurantsList = undefined;
        let error = undefined;

        try {
            restaurantsList = await restaurantModel.findAllRestaurant();
        } catch (err) {
            error = 'An error occurred while fetching restaurant data';
        }
        const renderOptions = { restaurantsList, error, ...options };
        await this.renderWithDefaults(req, res, 'browseMenu', renderOptions );
    }

    async addToCart(req, res) {
        let { itemID, itemName, itemPrice, itemQuantity } = req.body;
    
        // 确保 itemQuantity 是数值类型
        itemQuantity = parseInt(itemQuantity, 10); // 转换为数字
    
        let totalQuantity = 0;
        const index = req.session.cart.findIndex(item => item.itemID === itemID);
    
        if (index === -1) { // 检查条件的准确性
            req.session.cart.push({ itemID: itemID, itemName: itemName, itemPrice: itemPrice , itemQuantity: itemQuantity });
            totalQuantity = itemQuantity;
        } else {
            req.session.cart[index].itemQuantity += itemQuantity;
            totalQuantity = req.session.cart[index].itemQuantity;
        }
        
        await this.renderBrowseMenu(req, res, { success: `Item ${ itemName } added to cart, current quantity : ${totalQuantity}` });
    }

    async renderViewCart(req, res) {

        let cart = req.session.cart;
        let items = [];
        let itemTotalPrice = cart.reduce((sum, item) => sum + item.itemPrice * item.itemQuantity, 0);


        await this.renderWithDefaults(req, res, 'viewCart', { cart: req.session.cart, itemTotalPrice: itemTotalPrice });
    }

}

module.exports = new AdminController();