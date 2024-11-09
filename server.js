// 導入依賴
const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const UserModel = require('./models/userModel');
require('./lib/debugLogheader');

// 導入路由
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

// 創建依賴實體
const app = express();

// 創建配置參數
const PORT = process.env.PORT || 3000;

// 設置模板引擎
app.set('view engine', 'ejs');
// app.set('views', './views'); // 設置視圖文件夾

// 設置中間件
app.use(bodyParser.urlencoded({ extended: true })); // 解析 url 編碼格式請求體
app.use(session({ // 設置會話規則
    name: 'session',
    secret: 'COMPS350F_GROUPPROJECT39',
    keys: ['key1', 'key2'],
    resave: false,
    saveUninitialized: true
}));
app.use('/public', express.static('public'));

// ----------------------

// 使用路由
app.use('/user', userRoutes); // 登入功能路由

app.use('/restaurant', restaurantRoutes); // 餐廳功能路由

// 根路由 
app.get('/', async (req, res) => {
    res.render('index', { userId: req.session.userId });
});

// ------------------------

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`伺服器運行在 http://localhost:${PORT}`);
});

