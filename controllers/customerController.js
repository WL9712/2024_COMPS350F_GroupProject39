
const RestaurantModel = require('../models/restaurantModel');
const OrderModel = require('../models/orderModel');

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
        let { itemID, itemName, itemPrice, itemQuantity, restaurantID } = req.body;
    
        // 确保 itemQuantity 是数值类型
        itemQuantity = parseInt(itemQuantity, 10); // 转换为数字
    
        let totalQuantity = 0;
        const index = req.session.cart.findIndex(item => item.itemID === itemID);
    
        if (index === -1) { // 检查条件的准确性
            req.session.cart.push({ restaurantID: restaurantID, itemID: itemID, itemName: itemName, itemPrice: itemPrice , itemQuantity: itemQuantity });
            totalQuantity = itemQuantity;
        } else {
            req.session.cart[index].itemQuantity += itemQuantity;
            totalQuantity = req.session.cart[index].itemQuantity;
        }
        
        await this.renderBrowseMenu(req, res, { success: `Item ${ itemName } added to cart, current quantity : ${totalQuantity}` });
    }

    async renderViewCart(req, res, options = {}) {

        let cart = req.session.cart;
        let items = [];
        let itemTotalPrice = cart.reduce((sum, item) => sum + item.itemPrice * item.itemQuantity, 0);

        const renderOptions = { cart: req.session.cart, itemTotalPrice: itemTotalPrice, ...options };
        await this.renderWithDefaults(req, res, 'viewCart', renderOptions);
    }

    async getItemPriceByID(itemID) {
        const restaurantModel = new RestaurantModel();
        let restaurantList = await restaurantModel.findAllRestaurant();
        for (const restaurant of restaurantList) {
            const foundItem = restaurant.menuItems.find(item => item.itemID.equals(itemID)); // 使用 equals 方法比较 ObjectId
            if (foundItem) {
                return foundItem.itemPrice; // 返回找到的 item's price
            }
        }
        return null; // 如果没有找到返回 null
    }

    async checkout(req, res) { 
        let cart = req.session.cart;
        let itemTotalPrice = 0;
        
        
        for (const item of cart) {
            let itemPrice = await this.getItemPriceByID(item.itemID);
            itemTotalPrice += itemPrice * item.itemQuantity;
        }

        // create order on mongodb
        const orderModel = new OrderModel();
        const order = {
            userID: req.session.user.userID,
            restaurantID: cart[0].restaurantID,
            menuItem: cart,
            orderStatus: 'Pending'
        };

        req.session.cart = [];

        let result = await orderModel.createOrder(order).catch(async err => {
            await this.renderViewCart(req, res, { error: 'An error occurred while creating order' });
        });
        
        await this.renderViewCart(req, res, { success: `Order created, total price: ${itemTotalPrice}` });

        // await this.renderBrowseMenu(req, res, { success: `Order created, total price: ${itemTotalPrice}` });        

        // await this.renderWithDefaults(req, res, 'checkout', { itemTotalPrice: itemTotalPrice });
    }


}

module.exports = new AdminController();