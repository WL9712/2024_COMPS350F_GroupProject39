# 2024_COMPS350F_GroupProject39
基於 MVC 架構的網絡應用程式

## 文件夾結構
/2024_COMPS350F_GroupProject39  
|-- /controllers             // 控制器文件夾 - 放置控制邏輯代碼  
|   |-- userController.js    // 處理登入邏輯，包括用戶身份認證和會話管理  
|-- /models                  // 數據模型文件夾 - 定義數據結構和數據交互邏輯  
|   |-- UserModel.js         // 用戶數據模型 - 定義用戶結構和數據操作方法，包括查詢和更新  
|-- /routes                  // 路由文件夾 - 定義應用的所有路由邏輯  
|   |-- userRoutes.js        // 登入相關路由 - 定義與身份驗證相關的 HTTP 路由，如登入和登出  
|-- /views                   // 視圖模板文件夾 - 存放呈現的 HTML 模板文件  
|   |-- index.ejs            // 儀表板頁面模板 - 用戶登入後的主界面，顯示用戶資訊  
|   |-- login.ejs            // 登入頁面模板 - 用於顯示登入表單和處理錯誤提示  
|-- /node_modules            // 項目依賴 - 自動生成的文件夾，包含所有安裝的 npm 包  
|-- server.js                // 主應用文件 - 設置 Express 應用、配置中間件和啟動服務器  
|-- package.json             // 項目配置文件 - 記錄依賴庫及項目基本信息，如名稱、版本、腳本等  
|-- package-lock.json        // 鎖定依賴的確切版本 - 確保每次安裝的依賴版本一致  

## 已實現功能
- 登入/登出功能