const express = require('express');
const router = express.Router();
const phongController = require('../controllers/phong.controller');

/**
 * @swagger
 * tags:
 *   name: Phong
 *   description: Quản lý phòng
 */

/**
 * @swagger
 * /api/phong:
 *   get:
 *     summary: Lấy danh sách phòng
 *     tags: [Phong]
 *     responses:
 *       200:
 *         description: Danh sách phòng
 */

router.get('/', phongController.getAllPhong);
// ... các routes khác

module.exports = router;