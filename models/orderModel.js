const mongoose = require('mongoose'); // 引入 mongoose 模組，用來操作 MongoDB 資料庫
const DatabaseHandler = require('./databaseHandler'); // 引入自定義的資料庫處理模組

class OrderModel {

    constructor() {

        this.orderSchema = new mongoose.Schema({
            orderID: {
                type: mongoose.Schema.Types.ObjectId,
                default: () => new mongoose.Types.ObjectId(),
                required: true,
                unique: true
            },
            userID: { type: String, required: true },
            restaurantID: { type: mongoose.Schema.Types.ObjectId, required: true },
            menuItem: [{
                type: {
                    itemID: { type: mongoose.Schema.Types.ObjectId, required: true },
                    itemName: { type: String },
                    itemPrice: { type: Number }
                },
                required: true
            }],
            orderStatus: { type: String, required: true },
            createAt: { type: Date, default: Date.now }
        });

        // 檢查是否已經定義過 User 模型
        if (!mongoose.models.Order) {
            // 如果沒有定義過，則創建新的 User 模型
            this.Order = mongoose.model('Order', this.orderSchema);
        } else {
            // 如果已經存在 User 模型，則直接使用它
            this.Order = mongoose.models.Order; // 使用已存在的模型
        }

        this.collectionName = 'orders'; // 定義集合名稱
        this.db = new DatabaseHandler(); // 創建一個新的 DatabaseHandler 實例來處理資料庫操作
    }

    async createOrder(order) {
        let result = await this.db.insertOne(this.Order, order).catch(err => {
            throw err;
        });
        return result;
    }

    async findAllOrder() {
        let result = await this.db.findAll(this.Order).catch(err => {
            throw err;
        });
        return result;
    }

}

module.exports = OrderModel; // 將 AdminModel 類別匯出，讓其他模組可以使用