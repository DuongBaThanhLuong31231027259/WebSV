// file: connection.js

const sql = require('mssql');
require('dotenv').config();

// Cấu hình kết nối SQL Server - Cách 2
const config = {
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    options: {
        trustServerCertificate: true
    }
};

// Hàm kết nối giữ nguyên
const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log('Kết nối SQL Server bằng tài khoản Windows thành công! ✅');
    } catch (err) {
        console.error('Lỗi kết nối SQL Server:', err);
        process.exit(1);
    }
};

module.exports = { connectDB, sql };