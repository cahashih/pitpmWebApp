const { decode } = require('jsonwebtoken');
const jwtUtils = require('../utils/jwtUtils'); // Подключение утилит для работы с JWT

function checkAdmin(req, res, next) {
    const token = req.headers.authorization; // Получение токена из заголовка запроса

    if (!token) {
        return res.status(401).json({ error: 'No token provided' }); // Если токен отсутствует, возвращаем ошибку
    }

    try {
        const decoded = jwtUtils.verifyToken(token); // Проверяем и декодируем токен
        if (decoded.role !== 'admin') { // Проверяем роль пользователя из декодированного токена
            console.log(decoded.role); // Выводим роль для отладки (можно удалить в production)
            console.log(token); // Выводим токен для отладки (можно удалить в production)
            return res.status(403).json({ error: 'Access denied' }); // Если роль не администратора, возвращаем ошибку доступа
        }
        next(); // Продолжаем выполнение следующего middleware, если пользователь администратор
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' }); // Если токен неверный, возвращаем ошибку
    }
}

module.exports = { checkAdmin };
