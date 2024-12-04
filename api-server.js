const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/proxy/token', async (req, res) => {
  try {
    const response = await axios.post('https://www.coze.cn/open/token/get', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json(error.response?.data || error.message);
  }
});

app.listen(3000);