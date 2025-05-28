// SỬA ĐƯỜNG DẪN Ở ĐÂY: từ '../db/booking.model' thành '../models/booking.model'
const bookingModel = require('../models/booking.model');

const bookingController = {
    async createBookingRequest(req, res) {
        try {
            // Lấy dữ liệu từ body của request
            const bookingData = req.body;

            // Validate dữ liệu cơ bản
            if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.check_in_date || !bookingData.check_out_date || !bookingData.room_type) {
                return res.status(400).json({ message: 'Vui lòng điền đầy đủ các trường thông tin bắt buộc.' });
            }

            // Gọi model để tạo yêu cầu đặt phòng
            const result = await bookingModel.createBookingRequest(bookingData);
            
            // Trả về thành công
            res.status(201).json(result);

        } catch (error) {
            // Xử lý lỗi từ model
            res.status(500).json({ 
                message: 'Không thể gửi yêu cầu đặt phòng.',
                error: error.message 
            });
        }
    }
};

module.exports = bookingController;