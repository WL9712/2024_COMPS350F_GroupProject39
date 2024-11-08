const mongoose = require('mongoose'); // 引入 mongoose 模組，用來操作 MongoDB 資料庫
const DatabaseHandler = require('./databaseHandler'); // 引入自定義的資料庫處理模組

class UserModel { // 定義一個名為 UserModel 的類別

    constructor() { // 構造函數，當創建 UserModel 的實例時會自動調用
        // 定義一個用戶的資料結構，包含用戶名和用戶密碼
        this.userSchema = new mongoose.Schema({
            userName: {type: String, required: true}, // userName 必須是字符串類型且必填
            userPassword: {type: String, required: true} // userPassword 必須是字符串類型且必填
        });

        // 檢查是否已經定義過 User 模型
        if (!mongoose.models.User) {
            // 如果沒有定義過，則創建新的 User 模型
            this.User = mongoose.model('User', this.userSchema);
        } else {
            // 如果已經存在 User 模型，則直接使用它
            this.User = mongoose.models.User; // 使用已存在的模型
        }
    }    
    
    // 靜態方法，用來查詢所有用戶
    static async findAllUser() {
        let db = new DatabaseHandler(); // 創建一個新的 DatabaseHandler 實例來處理資料庫操作
        await db.connect(); // 連接到資料庫
        let instance = new UserModel(); // 創建 UserModel 的實例，以便使用其模型
        let result = await instance.User.find(); // 查詢所有用戶資料
        await db.disconnect(); // 查詢完成後斷開資料庫連接
        return result; // 返回查詢結果
    }

    // 靜態方法，根據用戶名稱查詢單個用戶
    static async findUserByUserName(userName) {
        let db = new DatabaseHandler(); // 創建 DatabaseHandler 的實例
        await db.connect(); // 連接到資料庫
        let instance = new UserModel(); // 創建 UserModel 的實例
        // 查詢符合指定用戶名稱的單個用戶資料
        let result = await instance.User.findOne({userName: userName});
        await db.disconnect(); // 查詢完成後斷開資料庫連接
        return result; // 返回查詢結果
    }
}

// 將 UserModel 類別導出，以便其他模組可以使用
module.exports = UserModel;