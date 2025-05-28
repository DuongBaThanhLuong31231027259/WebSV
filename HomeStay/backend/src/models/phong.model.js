const { getDB, sql } = require('../db/connection');

const phongModel = {
  async getAllWithPrices() {
    try {
      const pool = getDB();
      // ### THAY ĐỔI CÂU LỆNH SQL ###
      // Thêm LEFT JOIN với bảng ANHPHONG để lấy thêm DuongLink của ảnh
      const result = await pool.request().query(`
        SELECT
            p.MaPhong,
            p.TenPhong,
            p.LoaiPhong,
            p.HangPhong,
            p.ThongTinPhong,
            p.TinhTrangPhong,
            gp.DonViTinh,
            gp.Gia,
            ap.DuongLink AS AnhPhongLink
        FROM
            PHONG AS p
        LEFT JOIN
            GIAPHONG AS gp ON p.MaPhong = gp.MaPhong
        LEFT JOIN
            ANHPHONG AS ap ON p.MaPhong = ap.MaPhong
        ORDER BY
            p.MaPhong, gp.DonViTinh, ap.MaAnhPhong;
      `);
      return result.recordset;
    } catch (err) {
      console.error('Lỗi truy vấn SQL:', err);
      throw err;
    }
  }
};

module.exports = phongModel;