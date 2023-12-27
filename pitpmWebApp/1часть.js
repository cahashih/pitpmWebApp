const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const dataPath = './products.json';

app.use(express.json())



let products = [];

fs.readFile(dataPath, 'utf8', (err, data) => {
if (err) {
console.error(err);
return;
}
try {
products = JSON.parse(data);
if (!Array.isArray(products)) {
throw new Error('Data is not an array');
}
} catch (error) {
console.error('Error parsing JSON:', error);
}
});

const saveProducts = () => {
fs.writeFile(dataPath, JSON.stringify(products, null, 2), 'utf8', err => {
if (err) {
console.error(err);
}
});
};

app.get('/products', (req, res) => {
res.json(products);
});

app.get('/products/:id', (req, res) => {
const productId = parseInt(req.params.id);
const product = products.find(product => product.id === productId);

if (!product) {
res.status(404).send('Product not found');
} else {
res.json(product);
}
});

app.post('/products', (req, res) => {
const { name, description, price } = req.body;
const newProduct = {
id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
name,
description,
price
};
products.push(newProduct);
saveProducts();
res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
const productId = parseInt(req.params.id);
const { name, description, price } = req.body;
const productIndex = products.findIndex(product => product.id === productId);

if (productIndex === -1) {
res.status(404).send('Product not found');
} else {
products[productIndex] = { ...products[productIndex], name, description, price };
saveProducts();
res.json(products[productIndex]);
}
});

app.delete('/products/:id', (req, res) => {
const productId = parseInt(req.params.id);
products = products.filter(product => product.id !== productId);
saveProducts();
res.send('Product deleted successfully');
});

app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});