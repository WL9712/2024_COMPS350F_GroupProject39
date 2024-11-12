const mongoose = require('mongoose'); // 引入 mongoose 模組，用來操作 MongoDB 資料庫
const DatabaseHandler = require('./databaseHandler'); // 引入自定義的資料庫處理模組

class AdminModel {

    constructor(userSchema) {
        this.dbHandler = new DatabaseHandler(); // 創建 DatabaseHandler 實例
    }

    async getUsersList() {

    }


}

module.exports = AdminModel; // 將 AdminModel 類別匯出，讓其他模組可以使用