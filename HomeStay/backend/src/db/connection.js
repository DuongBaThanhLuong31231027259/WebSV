// db.js
const mongoose = require('mongoose');

// Lấy chuỗi kết nối từ biến môi trường (đã cấu hình với dotenv)
const mongoURI = process.env.MONGODB_URI;

// Hàm kết nối đến MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true, // Tùy chọn này để tránh cảnh báo (deprecated)
            useUnifiedTopology: true, // Tùy chọn này cũng để tránh cảnh báo
            // useCreateIndex: true, // Tùy chọn này cũng để tránh cảnh báo (nếu bạn dùng index)
            // useFindAndModify: false, // Tùy chọn này cũng để tránh cảnh báo (nếu bạn dùng findOneAndUpdate, findOneAndDelete)
        });

        console.log('MongoDB đã kết nối thành công!');
    } catch (err) {
        console.error('Lỗi kết nối MongoDB:', err);
        process.exit(1); // Thoát ứng dụng nếu kết nối thất bại
    }
};

// Ngắt kết nối khi ứng dụng tắt (tùy chọn)
const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB đã ngắt kết nối.');
    } catch (err) {
        console.error('Lỗi ngắt kết nối MongoDB:', err);
    }
};

module.exports = { connectDB, disconnectDB };