// SỬA ĐƯỜNG DẪN Ở ĐÂY: từ '../db/phong.model' thành '../models/phong.model'
const phongModel = require('../models/phong.model');

const phongController = {
  async getAllPhongWithGia(req, res) {
    try {
      const data = await phongModel.getAllWithPrices();

      if (!data || data.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy thông tin phòng nào.' });
      }
      
      const phongData = {};
      data.forEach(row => {
        const { MaPhong, DonViTinh, Gia, AnhPhongLink } = row;

        if (!phongData[MaPhong]) {
          phongData[MaPhong] = {
            MaPhong: row.MaPhong,
            TenPhong: row.TenPhong,
            LoaiPhong: row.LoaiPhong,
            HangPhong: row.HangPhong,
            ThongTinPhong: row.ThongTinPhong,
            TinhTrangPhong: row.TinhTrangPhong,
            GiaPhong: [],
            AnhPhong: []
          };
        }

        if (DonViTinh && Gia && !phongData[MaPhong].GiaPhong.some(p => p.DonViTinh === DonViTinh)) {
          phongData[MaPhong].GiaPhong.push({ DonViTinh, Gia });
        }

        if (AnhPhongLink && !phongData[MaPhong].AnhPhong.includes(AnhPhongLink)) {
          phongData[MaPhong].AnhPhong.push(AnhPhongLink);
        }
      });

      const result = Object.values(phongData);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        message: 'Có lỗi xảy ra trên server khi lấy dữ liệu phòng!',
        error: error.message
      });
    }
  }
};

module.exports = phongController;