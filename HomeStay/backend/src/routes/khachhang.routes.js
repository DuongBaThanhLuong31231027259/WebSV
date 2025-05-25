const express = require('express');
const router = express.Router();
const khachHangController = require('../controllers/khachhang.controller');

/**
 * @swagger
 * tags:
 *   name: KhachHang
 *   description: Quản lý khách hàng
 */

/**
 * @swagger
 * /api/khachhang:
 *   get:
 *     summary: Lấy danh sách khách hàng
 *     tags: [KhachHang]
 *     responses:
 *       200:
 *         description: Danh sách khách hàng
 */

/**
 * @swagger
 * /api/khachhang/{id}:
 *   get:
 *     summary: Lấy thông tin khách hàng theo ID
 *     tags: [KhachHang]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin khách hàng
 *       404:
 *         description: Không tìm thấy khách hàng
 */

/**
 * @swagger
 * /api/khachhang:
 *   post:
 *     summary: Thêm khách hàng mới
 *     tags: [KhachHang]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               HoVaTen:
 *                 type: string
 *               Email:
 *                 type: string
 *               SDT:
 *                 type: string
 *     responses:
 *       201:
 *         description: Thêm thành công
 */

// Định nghĩa các routes
router.get('/', khachHangController.getAllKhachHang);
router.get('/:id', khachHangController.getKhachHangById);
router.post('/', khachHangController.createKhachHang);
// router.put('/:id', khachHangController.updateKhachHang);
// router.delete('/:id', khachHangController.deleteKhachHang);

// Đăng ký tài khoản khách hàng
router.post('/register', khachHangController.registerKhachHang);

module.exports = router;