const users = [
    { username: 'user1', password: 'password1' }, // 用戶名和密碼
    { username: 'user2', password: 'password2' }
]

class UserModel {
    static findOne({ username }) {
        return users.find(user => user.username === username);
    }
}

module.exports = UserModel;
