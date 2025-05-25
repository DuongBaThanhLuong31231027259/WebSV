const { sql } = require('../db/connection'); // Import từ file kết nối DB của bạn

// Lấy tất cả khách hàng
const getAll = async () => {
    const request = new sql.Request();
    const result = await request.query('SELECT * FROM KHACHHANG');
    return result.recordset;
};

// Lấy khách hàng theo ID
const getById = async (maKH) => {
    const request = new sql.Request();
    request.input('maKH', sql.VarChar, maKH);
    const result = await request.query('SELECT * FROM KHACHHANG WHERE MaKH = @maKH');
    return result.recordset[0];
};

// Tạo khách hàng mới
const create = async (data) => {
    const { MaKH, HoVaTen, GioiTinh, SDT, TenFacebook, NgaySinh, Email, GhiChu, SoCCCD } = data;
    const request = new sql.Request();
    request.input('MaKH', sql.VarChar, MaKH);
    request.input('HoVaTen', sql.NVarChar, HoVaTen);
    request.input('GioiTinh', sql.NVarChar, GioiTinh);
    request.input('SDT', sql.Char, SDT);
    request.input('TenFacebook', sql.NVarChar, TenFacebook);
    request.input('NgaySinh', sql.Date, NgaySinh);
    request.input('Email', sql.VarChar, Email);
    request.input('GhiChu', sql.NVarChar, GhiChu);
    request.input('SoCCCD', sql.Char, SoCCCD);

    const query = `
        INSERT INTO KHACHHANG (MaKH, HoVaTen, GioiTinh, SDT, TenFacebook, NgaySinh, Email, GhiChu, SoCCCD)
        VALUES (@MaKH, @HoVaTen, @GioiTinh, @SDT, @TenFacebook, @NgaySinh, @Email, @GhiChu, @SoCCCD)
    `;
    await request.query(query);
    return { MaKH, ...data };
};

// Cập nhật thông tin khách hàng
const update = async (maKH, data) => {
    const { HoVaTen, GioiTinh, SDT, TenFacebook, NgaySinh, Email, GhiChu, SoCCCD } = data;
    const request = new sql.Request();
    request.input('maKH', sql.VarChar, maKH);
    request.input('HoVaTen', sql.NVarChar, HoVaTen);
    request.input('GioiTinh', sql.NVarChar, GioiTinh);
    request.input('SDT', sql.Char, SDT);
    // ... thêm các input khác tương tự
    
    const query = `
        UPDATE KHACHHANG SET 
            HoVaTen = @HoVaTen, 
            GioiTinh = @GioiTinh,
            SDT = @SDT
            -- ... thêm các trường khác
        WHERE MaKH = @maKH
    `;
    await request.query(query);
    return { maKH, ...data };
};

// Xóa khách hàng
const remove = async (maKH) => {
    const request = new sql.Request();
    request.input('maKH', sql.VarChar, maKH);
    await request.query('DELETE FROM KHACHHANG WHERE MaKH = @maKH');
    return { message: `Khách hàng ${maKH} đã được xóa.` };
};

// Tìm khách hàng theo email
const findByEmail = async (email) => {
    const request = new sql.Request();
    request.input('Email', sql.VarChar, email);
    const result = await request.query('SELECT * FROM KHACHHANG WHERE Email = @Email');
    return result.recordset[0];
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    findByEmail
};