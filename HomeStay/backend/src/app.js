// app.js - Phiên bản cập nhật

// 1. Nạp biến môi trường
require('dotenv').config();

// 2. Import các thư viện
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { connectDB } = require('./db/connection');

// 3. Import các file routes của dự án
const phongRoutes = require('./routes/phong.routes'); // Routes cho phòng
const bookingRoutes = require('./routes/booking.routes'); 
const app = express();

// 4. Cấu hình Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Định nghĩa các API Routes
app.use('/api/phong', phongRoutes); //
app.use('/api/booking', bookingRoutes);
// 6. Cấu hình Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nam\'s Homestay API',
            version: '1.0.0',
            description: 'Tài liệu API cho dự án Quản lý Homestay',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Development server'
            }
        ]
    },
    // <<< THAY ĐỔI Ở ĐÂY >>>
    apis: ['./routes/*.js'], // Đường dẫn tới các file có chứa comment Swagger
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 7. Route mặc định và Health Check
app.get('/', (req, res) => {
    res.json({ 
        message: 'Chào mừng đến với API của Nam\'s Homestay!',
        docs: '/api-docs' 
    });
});

// 8. Xử lý lỗi 404 - Route không tồn tại
app.use('*', (req, res) => {
    res.status(404).json({ message: `Không tìm thấy đường dẫn ${req.originalUrl}` });
});

// 9. Middleware xử lý lỗi tập trung
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Có lỗi xảy ra trên server!', error: err.message });
});

// 10. Khởi động Server
const port = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server đang chạy trên cổng ${port}`);
        console.log(`Database đã kết nối thành công.`);
        console.log(`Truy cập API docs tại: http://localhost:${port}/api-docs`);
    });
}).catch(err => {
    console.error('Không thể khởi động server do lỗi kết nối database.', err);
    process.exit(1);
});