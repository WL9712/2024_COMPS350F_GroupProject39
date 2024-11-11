const mongoose = require('mongoose'); // 引入 mongoose 模組，用來操作 MongoDB 資料庫
const DatabaseHandler = require('./databaseHandler'); // 引入自定義的資料庫處理模組

class RestaurantModel { // 定義一個名為 UserModel 的類別

    constructor() { // 構造函數，當創建 UserModel 的實例時會自動調用
        // 定義一個用戶的資料結構，包含用戶名和用戶密碼
        this.restaurantSchema = new mongoose.Schema({
            restaurantName: {
                type: String,
                required: true,
                index: true,
                unique: true
            },
            menuItems: { // 陣列本身是可選的，可以保持空
                type: [
                    {
                        itemName: { type: String, required: true },
                        itemPrice: { type: Number, required: true }
                    }
                ],
                default: [] // 默認為空陣列
            },
            address: {
                city: { type: String, required: true },
                street: { type: String, required: true }
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        });

        // 檢查是否已經定義過 User 模型
        if (!mongoose.models.Restaurant) {
            // 如果沒有定義過，則創建新的 User 模型
            this.Restaurant = mongoose.model('Restaurant', this.restaurantSchema);
        } else {
            // 如果已經存在 User 模型，則直接使用它
            this.Restaurant = mongoose.models.Restaurant; // 使用已存在的模型
        }

        this.collectionName = 'restaurants'; // 定義集合名稱
        this.db = new DatabaseHandler(); // 創建一個新的 DatabaseHandler 實例來處理資料庫操作
    }

    // 靜態方法，用來查詢所有用戶
    async findAllRestaurant() {
        let result = await this.db.findAll(this.Restaurant).catch(err => {
            throw err;
        });
        return result;
    }

    // 靜態方法，根據用戶名稱查詢單個用戶
    async findRestaurantByRestaurantName(restaurantName) {
        let result = await this.db.findOne(this.Restaurant, { restaurantName: restaurantName }).catch(err => {
            throw err;
        });
        return result;
    }

    async insertRestaurant(restaurantName, menuItems, address) {
        console.log("Inserting restaurant with the following details:", {
            restaurantName,
            menuItems,
            address
        });
        let result = await this.db.insertOne(this.Restaurant, {
            restaurantName: restaurantName,
            menuItems: menuItems || [],
            address: address
        }).catch(err => {
            throw err;
        });
        return result;
    }

    async insertMenuItemByRestaurantNameAnd(restaurantName, itemName, itemPrice) {
        let result = await this.db.updateOne(this.Restaurant, { restaurantName: restaurantName }, {
            $push: {
                menuItems: {
                    itemName: itemName,
                    itemPrice: itemPrice
                }
            }
        }).catch(err => {
            throw err;
        });
        return result;
    }

    async updateMenuItemByRestaurantName(restaurantName, itemName, itemPrice) {
        let result = await this.db.updateOne(this.Restaurant, { restaurantName: restaurantName, "menuItems.itemName": itemName }, {
            $set: {
                "menuItems.$.itemName": itemPrice
            }
        }).catch(err => {
            throw err;
        });
        return result;
    }
}

// 將 UserModel 類別導出，以便其他模組可以使用
module.exports = RestaurantModel;