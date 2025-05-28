const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

/**
 * @swagger
 * tags:
 * name: Booking
 * description: API để quản lý việc đặt phòng
 */

/**
 * @swagger
 * /api/booking:
 * post:
 * summary: Tạo một yêu cầu đặt phòng mới
 * tags: [Booking]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * email:
 * type: string
 * phone:
 * type: string
 * check_in_date:
 * type: string
 * format: date
 * check_out_date:
 * type: string
 * format: date
 * num_guests:
 * type: integer
 * room_type:
 * type: string
 * enum: [economy, second-class, first-class]
 * message:
 * type: string
 * responses:
 * 201:
 * description: Yêu cầu đặt phòng đã được tạo thành công.
 * 400:
 * description: Dữ liệu gửi lên không hợp lệ.
 * 500:
 * description: Lỗi từ máy chủ.
 */
router.post('/', bookingController.createBookingRequest);

module.exports = router;