const { sql } = require('../db/connection');

const getAll = async () => {
    const request = new sql.Request();
    const result = await request.query('SELECT * FROM PHONG');
    return result.recordset;
};

// ... các hàm getById, create, update, remove khác cho Phòng
module.exports = { getAll, /* ... */ };