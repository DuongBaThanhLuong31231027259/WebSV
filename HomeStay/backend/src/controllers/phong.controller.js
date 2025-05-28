const phongModel = require('../db/phong.model');

const phongController = {
  /**
   * Xử lý yêu cầu lấy danh sách tất cả các phòng cùng với giá.
   * @param {object} req - Đối tượng request của Express.
   * @param {object} res - Đối tượng response của Express.
   */
  async getAllPhongWithGia(req, res) {
    try {
      const data = await phongModel.getAllWithPrices();

      if (!data || data.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy thông tin phòng nào.' });
      }

      // Nhóm các mức giá (theo giờ, ngày) vào từng phòng tương ứng
      const phongData = {};
      data.forEach(row => {
        const { MaPhong, TenPhong, LoaiPhong, HangPhong, ThongTinPhong, TinhTrangPhong, DonViTinh, Gia } = row;

        if (!phongData[MaPhong]) {
          phongData[MaPhong] = {
            MaPhong,
            TenPhong,
            LoaiPhong,
            HangPhong,
            ThongTinPhong,
            TinhTrangPhong,
            GiaPhong: [] // Tạo mảng để chứa các mức giá
          };
        }

        // Thêm thông tin giá vào phòng
        if (DonViTinh && Gia) {
          phongData[MaPhong].GiaPhong.push({
            DonViTinh,
            Gia
          });
        }
      });

      // Chuyển đổi đối tượng đã nhóm thành một mảng để trả về
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