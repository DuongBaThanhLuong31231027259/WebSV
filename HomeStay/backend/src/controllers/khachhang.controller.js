const KhachHangModel = require('../models/khachhang.model'); // Import mô hình Khách Hàng

const getAllKhachHang = async (req, res) => {
    try {
        const khachhangs = await KhachHangModel.getAll();
        res.json(khachhangs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getKhachHangById = async (req, res) => {
    try {
        const { id } = req.params;
        const khachhang = await KhachHangModel.getById(id);
        if (!khachhang) {
            return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
        }
        res.json(khachhang);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createKhachHang = async (req, res) => {
    try {
        const newKhachHang = await KhachHangModel.create(req.body);
        res.status(201).json(newKhachHang);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const registerKhachHang = async (req, res) => {
    try {
        // Kiểm tra email đã tồn tại chưa
        const { Email } = req.body;
        const existing = await KhachHangModel.findByEmail(Email);
        if (existing) {
            return res.status(400).json({ message: 'Email đã được sử dụng.' });
        }
        const newKhachHang = await KhachHangModel.create(req.body);
        res.status(201).json({ message: 'Đăng ký thành công', khachhang: newKhachHang });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Viết các hàm updateKhachHang và deleteKhachHang tương tự...

module.exports = {
    getAllKhachHang,
    getKhachHangById,
    createKhachHang,
    registerKhachHang,
    // updateKhachHang,
    // deleteKhachHang
};