const express = require('express');
const router = express.Router();
const phongController = require('../controllers/phong.controller');

/**
 * @swagger
 * tags:
 *   - name: Phong
 *     description: API để quản lý thông tin phòng
 */

/**
 * @swagger
 * /api/phong/with-prices:
 *   get:
 *     summary: Lấy danh sách tất cả các phòng cùng với thông tin giá
 *     tags: [Phong]
 *     description: Trả về một danh sách các phòng, mỗi phòng bao gồm thông tin chi tiết và một mảng các mức giá (theo giờ và/hoặc theo ngày).
 *     responses:
 *       200:
 *         description: Thành công. Trả về danh sách các phòng.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   MaPhong:
 *                     type: string
 *                     example: "P01"
 *                   TenPhong:
 *                     type: string
 *                     example: "Breeze"
 *                   LoaiPhong:
 *                     type: string
 *                     example: "Comfy"
 *                   HangPhong:
 *                     type: string
 *                     example: "E"
 *                   ThongTinPhong:
 *                     type: string
 *                     example: "Phòng Breeze - không gian thoáng đãng, tiện nghi cơ bản, phù hợp nghỉ ngơi ngắn hạn."
 *                   TinhTrangPhong:
 *                     type: string
 *                     example: "Bình thường"
 *                   GiaPhong:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         DonViTinh:
 *                           type: string
 *                           example: "ngày"
 *                         Gia:
 *                           type: number
 *                           example: 390000
 *       404:
 *         description: Không tìm thấy dữ liệu.
 *       500:
 *         description: Lỗi từ máy chủ.
 */
router.get('/with-prices', phongController.getAllPhongWithGia);

module.exports = router;