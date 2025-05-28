const sql = require('mssql');
require('dotenv').config();

// Cấu hình kết nối lấy từ file .env
const config = {
    server: process.env.DB_SERVER, // Đảm bảo biến môi trường khớp
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        // trustServerCertificate: true là cần thiết khi kết nối tới SQL Server trên máy local
        // hoặc khi server không có chứng chỉ SSL hợp lệ.
        trustServerCertificate: process.env.DB_ENCRYPT === 'false' || true 
    }
};

// Biến này sẽ giữ "pool" kết nối sau khi kết nối thành công.
let pool;

// Hàm này sẽ được gọi một lần duy nhất trong app.js để thiết lập kết nối.
const connectDB = async () => {
    try {
        // Tạo pool kết nối và gán vào biến 'pool'.
        pool = await sql.connect(config);
        console.log('Kết nối SQL Server thành công! ✅');
    } catch (err) {
        console.error('Lỗi kết nối SQL Server:', err);
        pool = null; // Đặt lại pool là null nếu có lỗi
        process.exit(1); // Thoát ứng dụng nếu không kết nối được DB
    }
};

// Hàm này sẽ được các model gọi để lấy ra pool kết nối đã được thiết lập.
const getDB = () => {
    if (!pool) {
        throw new Error('Kết nối DB chưa được thiết lập. Hãy đảm bảo connectDB() đã được gọi và thành công.');
    }
    return pool;
};

// Export cả hai hàm connectDB và getDB.
module.exports = {
    connectDB,
    getDB,
    sql
};