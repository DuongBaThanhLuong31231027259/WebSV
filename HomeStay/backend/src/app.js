const express = require('express');
const app = express();
const PORT = 3000;

// Import router
const router = require('./routes/index');

app.use(express.json()); // Nếu bạn muốn nhận dữ liệu JSON từ client

app.get('/', (req, res) => {
  res.send('Backend HomeStay is running!');
});

app.use('/api', router); // Định tuyến các API qua /api

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});