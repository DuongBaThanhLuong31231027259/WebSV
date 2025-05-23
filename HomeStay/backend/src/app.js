// app.js (hoặc server.js)

// 1. Nạp biến môi trường (luôn ở đầu)
require('dotenv').config();

// 2. Import các thư viện cần thiết
const express = require('express');
const app = express();
const { connectDB } = require('./db/connection'); // Import hàm kết nối DB
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// 3. Import các file routes của bạn
const userRoutes = require('./routes/userRoutes');
//const productRoutes = require('./routes/productRoutes');
// Nếu bạn có một file index.js trong thư mục routes để gom tất cả lại:
// const apiRoutes = require('./routes/index');

// 4. Cấu hình Middleware cơ bản
// Cho phép Express đọc JSON từ request body
app.use(express.json());
// Cho phép Express đọc dữ liệu từ form URL-encoded (nếu cần)
app.use(express.urlencoded({ extended: true }));

// (Tùy chọn) Thêm middleware cho CORS nếu frontend và backend chạy trên các domain/port khác nhau
const cors = require('cors');
app.use(cors());

// 5. Kết nối Database
connectDB();

// 6. Định nghĩa các API Routes
// Gắn các router vào một đường dẫn cơ sở cụ thể
// Ví dụ: mọi request tới /api/users sẽ được xử lý bởi userRoutes
app.use('/api/users', userRoutes);
// Ví dụ: mọi request tới /api/products sẽ được xử lý bởi productRoutes
//app.use('/api/products', productRoutes);

// Nếu bạn sử dụng file index.js để gom các route:
// app.use('/api', apiRoutes); // Mọi API sẽ bắt đầu bằng /api

// 7. Định nghĩa một route mặc định hoặc route kiểm tra sức khỏe (health check)
app.get('/', (req, res) => {
    res.send('Chào mừng đến với API của bạn! (vui lòng truy cập /api/<tên_resource>)');
});

// 8. Xử lý lỗi (Middleware lỗi) - Luôn đặt sau tất cả các routes và middleware khác
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Có lỗi xảy ra trên server!');
});

// 9. Cấu hình Swagger cho tài liệu API
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'HomeStay API',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.js'], // Đường dẫn tới các file route để tự động sinh docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 10. Khởi động Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server đang chạy trên cổng ${port}`);
    console.log(`Truy cập: http://localhost:${port}`);
});