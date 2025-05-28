// Import đúng hàm getDB từ connection.js
const { getDB, sql } = require('../db/connection');

const phongModel = {
  async getAllWithPrices() {
    try {
      // SỬA Ở ĐÂY: Bỏ `await` vì getDB giờ là hàm đồng bộ.
      const pool = getDB(); 
      const result = await pool.request().query(`
        SELECT
            p.MaPhong,
            p.TenPhong,
            p.LoaiPhong,
            p.HangPhong,
            p.ThongTinPhong,
            p.TinhTrangPhong,
            gp.DonViTinh,
            gp.Gia
        FROM
            PHONG AS p
        LEFT JOIN
            GIAPHONG AS gp ON p.MaPhong = gp.MaPhong
        ORDER BY
            p.MaPhong, gp.DonViTinh;
      `);
      return result.recordset;
    } catch (err) {
      console.error('Lỗi truy vấn SQL:', err); // Log lỗi chi tiết
      throw err; // Ném lỗi ra để controller bắt
    }
  }
};

module.exports = phongModel;