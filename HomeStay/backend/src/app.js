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
const khachhangRoutes = require('./routes/khachhang.routes');
const phongRoutes = require('./routes/phong.routes');
// const doinguRoutes = require('./routes/doingu.routes'); // Ví dụ khi bạn tạo thêm
// ... import các routes khác

const app = express();

// 4. Cấu hình Middleware
app.use(cors()); // Cho phép kết nối từ các domain khác (frontend)
app.use(express.json()); // Đọc JSON từ request body
app.use(express.urlencoded({ extended: true })); // Đọc dữ liệu từ form

// 5. Định nghĩa các API Routes
app.use('/api/khachhang', khachhangRoutes);
app.use('/api/phong', phongRoutes);
// app.use('/api/doingu', doinguRoutes); // Ví dụ
// ...

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
    apis: ['./src/routes/*.js'], // Đường dẫn tới các file có chứa comment Swagger
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
// Middleware này sẽ được chạy nếu không có route nào khớp với request
app.use('*', (req, res) => {
    res.status(404).json({ message: `Không tìm thấy đường dẫn ${req.originalUrl}` });
});

// 9. Middleware xử lý lỗi tập trung - Luôn đặt ở cuối cùng
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Có lỗi xảy ra trên server!', error: err.message });
});

// 10. Khởi động Server sau khi kết nối DB thành công
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