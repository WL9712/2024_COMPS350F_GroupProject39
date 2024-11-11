# 2024_COMPS350F_GroupProject39
基於 MVC 架構的網絡應用程式：Food Tracking and Ordering

# How to run the project?

## 1. Install Node.js and npm
npm comes bundled with Node.js, so you need to install Node.js first. You can do this in several ways:

### Option A: Using Homebrew (Recommended)
If you don't have Homebrew installed, you can install it by running this command in your Terminal:

    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
After Homebrew is installed, you can install Node.js (which includes npm) by running:

    brew install node   

### Option B: Download from the Official Website
1.	Go to the Node.js official website.
2.	Download the macOS installer (choose the LTS version for stability).
3.	Run the installer and follow the instructions.

## 2. Verify the Installation
After installation, you can verify that Node.js and npm are installed correctly by checking their versions. Open your Terminal and run:

    node -v
    npm -v

You should see version numbers for both Node.js and npm.

## 3. Running npm Commands
Now that you have npm installed, you can run npm commands. Here are some common commands:


\- Install a package: To install a package (e.g., express), run:

    npm install express
    npm install body-parser
    npm install cookie-session
    npm install ejs
    npm install mongoose
    npm install


## 4. Running Project
If you have scripts defined in your package.json, you can run them using:

    npm run start

![serverRunning](/public/image/serverRunning.png)

## 文件夾結構
![folderStructure](/public/image/folderStructure.png "folderStructure")


## 已完成的功能
- 登入/登出功能
- 一般用戶註冊功能 (數據庫資料冲突驗證未完成)


## 已完成的UI介面
- 登入&註冊畫面 (暫定初稿，參考：https://www.youtube.com/watch?v=fC3qLUWf_Lk)
    ![loginUI](/public/image/loginUI.png "loginUI")