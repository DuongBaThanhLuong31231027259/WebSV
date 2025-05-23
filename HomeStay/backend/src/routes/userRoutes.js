// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Quản lý người dùng
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Email đã được sử dụng
 */
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email đã được sử dụng.' });
        }
        const user = new User({ name, email, password, age });
        await user.save();
        res.status(201).json({ message: 'Đăng ký thành công', user });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Đăng nhập
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       401:
 *         description: Email hoặc mật khẩu không đúng
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
        }
        // Nếu dùng JWT, tạo token ở đây
        res.json({ message: 'Đăng nhập thành công', user });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
});

// Thêm người dùng mới (Admin hoặc chức năng riêng)
router.post('/', async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        const user = new User({ name, email, password, age });
        await user.save();
        res.status(201).json({ message: 'Tạo người dùng mới thành công', user });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Lấy thông tin người dùng theo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin người dùng
 *       404:
 *         description: Không tìm thấy người dùng
 */
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
});

// Cập nhật người dùng
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        res.json({ message: 'Cập nhật thành công', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
});

// Xóa người dùng
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        res.json({ message: 'Xóa thành công', user: deletedUser });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
});

module.exports = router;