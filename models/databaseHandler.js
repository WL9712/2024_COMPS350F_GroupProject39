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
            console.log(debugLogheader("Databasehandler.connect()") + `Connected successfully to MongoDB database: ${this.dbUrl}`);
        } catch (err) {
            console.error(debugLogheader("Databasehandler.connect()") + 'Database connection error:', err);
            process.exit(1); // 连接失败时退出应用
        }
    }


    async disconnect() {
        if (this.isConnected) {
            await mongoose.connection.close();
            this.isConnect = false;
            console.log(debugLogheader("Databasehandler.disconnect()") + 'Database connection closed');
        }
    }

    // 查找数据
    async findOne(mongooseModel, queryObject) {
        try {
            await this.connect();
            const result = await mongooseModel.findOne(queryObject);
            console.log(debugLogheader("Databasehandler.findOne()") + 'Data found:', result);
            return result;
        } catch (err) {
            console.error(debugLogheader("Databasehandler.findOne()") + 'Find data error:', err);
            throw err;
        } finally {
            await this.disconnect();
        }
    }

    async findMany(mongooseModel, queryObject) {
        try {
            await this.connect();
            const result = await mongooseModel.findMany(queryObject);
            console.log(debugLogheader("Databasehandler.findMany()") + 'Data found:', result);
            return result;
        } catch (err) {
            console.error(debugLogheader("Databasehandler.findMany()") + 'Find data error:', err);
            throw err;
        } finally {
            await this.disconnect();
        }
    }

    // 查找多个数据
    async findAll(mongooseModel) {
        try {
            await this.connect();
            const result = await mongooseModel.findAll().toArray();
            console.log(debugLogheader("Databasehandler.findAll()") + 'Data found:', result);
            return result;
        } catch (err) {
            console.error(debugLogheader("Databasehandler.findAll()") + 'Find data error:', err);
            throw err;
        } finally {
            await this.disconnect();
        }
    }

    // 插入数据
    async insertOne(mongooseModel, queryObject) {
        try {
            await this.connect();
            const result = await mongooseModel.create(queryObject);
            console.log(debugLogheader("Databasehandler.insertOne()") + 'Data inserted successfully:', result);
            return result;
        } catch (err) {
            console.error(debugLogheader("Databasehandler.insertOne()") + 'Insert data error:', err);
            throw err;
        } finally {
            await this.disconnect();
        }
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