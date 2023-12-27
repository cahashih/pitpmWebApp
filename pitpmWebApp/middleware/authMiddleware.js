const { decode } = require('jsonwebtoken');
const jwtUtils = require('../utils/jwtUtils'); // ����������� ������ ��� ������ � JWT

function checkAdmin(req, res, next) {
    const token = req.headers.authorization; // ��������� ������ �� ��������� �������

    if (!token) {
        return res.status(401).json({ error: 'No token provided' }); // ���� ����� �����������, ���������� ������
    }

    try {
        const decoded = jwtUtils.verifyToken(token); // ��������� � ���������� �����
        if (decoded.role !== 'admin') { // ��������� ���� ������������ �� ��������������� ������
            console.log(decoded.role); // ������� ���� ��� ������� (����� ������� � production)
            console.log(token); // ������� ����� ��� ������� (����� ������� � production)
            return res.status(403).json({ error: 'Access denied' }); // ���� ���� �� ��������������, ���������� ������ �������
        }
        next(); // ���������� ���������� ���������� middleware, ���� ������������ �������������
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' }); // ���� ����� ��������, ���������� ������
    }
}

module.exports = { checkAdmin };
