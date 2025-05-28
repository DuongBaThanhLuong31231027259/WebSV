const { getDB, sql } = require('../db/connection');

/**
 * Hàm phụ trợ để tạo mã ngẫu nhiên
 * @param {string} prefix - Tiền tố (ví dụ: 'KH', 'DDP')
 * @param {number} length - Độ dài của phần số
 * @returns {string} - Mã ngẫu nhiên (ví dụ: 'KH009', 'DDP011')
 */
const generateRandomId = (prefix, length) => {
    const number = Math.floor(Math.random() * Math.pow(10, length));
    return prefix + number.toString().padStart(length, '0');
};

const bookingModel = {
    /**
     * Tạo một yêu cầu đặt phòng mới
     * @param {object} bookingData - Dữ liệu từ form đặt phòng
     */
    async createBookingRequest(bookingData) {
        const pool = getDB();
        const transaction = new sql.Transaction(pool);

        try {
            await transaction.begin();

            // === B1: Xử lý thông tin khách hàng ===
            let customerResult = await new sql.Request(transaction)
                .input('email', sql.VarChar, bookingData.email)
                .input('phone', sql.Char, bookingData.phone)
                .query('SELECT MaKH FROM KHACHHANG WHERE Email = @email OR SDT = @phone');

            let maKH;
            if (customerResult.recordset.length > 0) {
                maKH = customerResult.recordset[0].MaKH;
            } else {
                maKH = generateRandomId('KH', 3);
                await new sql.Request(transaction)
                    .input('MaKH', sql.VarChar, maKH)
                    .input('HoVaTen', sql.NVarChar, bookingData.name)
                    .input('GioiTinh', sql.NVarChar, 'Khác')
                    .input('SDT', sql.Char, bookingData.phone)
                    .input('NgaySinh', sql.Date, new Date('1990-01-01'))
                    .input('Email', sql.VarChar, bookingData.email)
                    .input('SoCCCD', sql.Char, bookingData.phone.padStart(12, '0'))
                    .query(`
                        INSERT INTO KHACHHANG (MaKH, HoVaTen, GioiTinh, SDT, NgaySinh, Email, SoCCCD)
                        VALUES (@MaKH, @HoVaTen, @GioiTinh, @SDT, @NgaySinh, @Email, @SoCCCD)
                    `);
            }

            // === B2: Tạo đơn đặt phòng ===
            const randomNV = await new sql.Request(transaction)
                .query('SELECT TOP 1 MaNV FROM DOINGU ORDER BY NEWID()');
            const maNV = randomNV.recordset[0].MaNV;
            const maDonDatPhong = generateRandomId('DDP', 3);

            await new sql.Request(transaction)
                .input('MaDonDatPhong', sql.VarChar, maDonDatPhong)
                .input('MaKH', sql.VarChar, maKH)
                .input('MaNV', sql.VarChar, maNV)
                .input('NgayDatPhong', sql.DateTime, new Date())
                .query(`
                    INSERT INTO DONDATPHONG (MaDonDatPhong, MaKH, MaNV, NgayDatPhong)
                    VALUES (@MaDonDatPhong, @MaKH, @MaNV, @NgayDatPhong)
                `);

            // === B3: Tìm phòng trống và tạo chi tiết đặt phòng ===
            const hangPhongMap = { 'economy': 'E', 'second-class': 'S', 'first-class': 'F' };
            const hangPhong = hangPhongMap[bookingData.room_type];
            const checkInDate = new Date(bookingData.check_in_date);
            const checkOutDate = new Date(bookingData.check_out_date);

            // ### THAY ĐỔI LOGIC TÌM PHÒNG ###
            // Tìm một phòng thuộc hạng phòng yêu cầu VÀ không có lịch đặt nào (trạng thái khác 'Đã hủy')
            // trùng với khoảng thời gian khách chọn.
            const availableRoom = await new sql.Request(transaction)
                .input('HangPhong', sql.VarChar, hangPhong)
                .input('CheckIn', sql.DateTime, checkInDate)
                .input('CheckOut', sql.DateTime, checkOutDate)
                .query(`
                    SELECT TOP 1 p.MaPhong
                    FROM PHONG p
                    WHERE 
                        p.HangPhong = @HangPhong 
                        AND p.TinhTrangPhong = N'Bình thường'
                        AND NOT EXISTS (
                            SELECT 1
                            FROM CHITIETDATPHONG ctdp
                            JOIN DONDATPHONG ddp ON ctdp.MaDonDatPhong = ddp.MaDonDatPhong
                            WHERE 
                                ctdp.MaPhong = p.MaPhong
                                AND ddp.TrangThaiDatPhong != N'Đã hủy'
                                AND (@CheckIn < ctdp.CheckOutDuKien AND @CheckOut > ctdp.CheckInDuKien)
                        )
                `);
            
            if (availableRoom.recordset.length === 0) {
                // Nếu không tìm thấy phòng nào, ném ra lỗi rõ ràng
                throw new Error(`Đã hết phòng hạng '${bookingData.room_type}' trong khoảng thời gian bạn chọn.`);
            }
            const maPhong = availableRoom.recordset[0].MaPhong;
            
            const maCT = generateRandomId('CT', 3);
            await new sql.Request(transaction)
                .input('MaCT', sql.VarChar, maCT)
                .input('MaDonDatPhong', sql.VarChar, maDonDatPhong)
                .input('MaPhong', sql.VarChar, maPhong)
                .input('CheckInDuKien', sql.DateTime, checkInDate)
                .input('CheckOutDuKien', sql.DateTime, checkOutDate)
                .query(`
                    INSERT INTO CHITIETDATPHONG (MaCT, MaDonDatPhong, MaPhong, CheckInDuKien, CheckOutDuKien)
                    VALUES (@MaCT, @MaDonDatPhong, @MaPhong, @CheckInDuKien, @CheckOutDuKien)
                `);
            
            await transaction.commit();
            return { success: true, message: 'Yêu cầu đặt phòng của bạn đã được gửi thành công!', bookingId: maDonDatPhong };

        } catch (err) {
            await transaction.rollback();
            console.error("Lỗi trong quá trình đặt phòng:", err);
            throw err;
        }
    }
};

module.exports = bookingModel;