const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db.sqlite'); // Подключение к базе данных SQLite

// Модель для управления пользователями в базе данных SQLite
const userModel = {
    // Создание нового пользователя
    createUser(firstName, lastName, middleName, city, role) {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO users (firstName, lastName, middleName, city, role) VALUES (?, ?, ?, ?, ?)',
                [firstName, lastName, middleName, city, role],
                function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ id: this.lastID });
                    }
                });
        });
    },

    // Поиск пользователей по роли
    findByRole(role) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM users WHERE role = ?', [role], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },

    // Получение всех пользователей
    getAllUsers() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM users', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    },

    // Поиск пользователя по имени и фамилии
    findUserByName(firstName, lastName) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE firstName = ? AND lastName = ?', [firstName, lastName], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    },
};

module.exports = userModel; // Экспорт модели для использования в других файлах
