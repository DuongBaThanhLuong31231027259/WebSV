const PhongModel = require('../models/phong.model');

const getAllPhong = async (req, res) => {
    try {
        const phongs = await PhongModel.getAll();
        res.json(phongs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ... các hàm controller khác
module.exports = { getAllPhong, /* ... */ };