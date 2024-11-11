const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 設定儲存位置和檔案命名
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads';
        
        // 確保 uploads 資料夾存在
        if (!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }
        
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // 使用 timestamp 作為檔名
    }
});

const upload = multer({ storage: storage });
module.exports = upload;