const mongoose = require('mongoose');

class DatabaseHandler {

    constructor() {
        this.dbUrl = "mongodb://nog19630:123@cluster0-shard-00-00.oicc7.mongodb.net:27017,cluster0-shard-00-01.oicc7.mongodb.net:27017,cluster0-shard-00-02.oicc7.mongodb.net:27017/COMPS350F_GroupProject39?ssl=true&replicaSet=atlas-13zfqv-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
        this.isConnect = false;
    }

    async connect() {

        try {
            await mongoose.connect(this.dbUrl);
            this.isConnected = true;
            console.log(`Connected successfully to MongoDB database: ${this.dbUrl}`);
        } catch (err) {
            console.error('Database connection error:', err);
            process.exit(1); // 连接失败时退出应用
        } finally {

        }

    }


    async disconnect() {
  
        if (this.isConnected) {
            await mongoose.connection.close();
            this.isConnect = false;
            console.log('Database connection closed');
        }
    }

    // 插入数据
    async insert(collection, data) {
        // 插入数据的逻辑
        
    }

    // 查找数据
    async find(collection, query) {
        // 查找并返回满足查询条件的数据


    }

    // 查找多个数据
    async findAll(collection, query) {
        // 查找并返回所有满足查询条件的数据
    }

    // 更新数据
    async update(collection, query, updateData) {
        // 更新数据的逻辑
    }

    // 删除数据
    async delete(collection, query) {
        // 删除满足查询条件的数据
    }

    // 统计数目
    async count(collection, query) {
        // 返回满足查询条件的数据数量
    }

    // 事务处理
    async transaction(callback) {
        // 实现事务机制的逻辑
    }

}

module.exports = DatabaseHandler;