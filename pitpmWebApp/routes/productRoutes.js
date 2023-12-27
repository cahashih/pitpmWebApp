const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');
const { checkAdmin } = require('../middleware/authMiddleware');

// Маршруты для продуктов
router.get('/products', productsController.getAllProducts); // Получение всех продуктов
router.get('/products/:id', productsController.getProductById); // Получение продукта по ID
router.post('/products', checkAdmin, productsController.createProduct); // Добавление нового продукта (только для админов)
router.put('/products/:id', checkAdmin, productsController.updateProduct); // Обновление продукта по ID (только для админов)
router.delete('/products/:id', checkAdmin, productsController.deleteProduct); // Удаление продукта по ID (только для админов)

const authController = require('../controllers/authController');

router.get('/user', authController.getAllUsers); // Получение всех пользователей
router.post('/register', authController.register); // Регистрация нового пользователя
router.post('/login', authController.login); // Вход пользователя

module.exports = router;
