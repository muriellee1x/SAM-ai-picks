const axios = require('axios');

const API_TOKEN = 'pat_ewn7BZ9gjeCxjpufsqsxCKlEvYdLOTi9w3ZHOgNXmituSw8AshZhhhYWii1rAQtH';
const BOT_ID = '7442161757059235878';

async function publishBot() {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://api.coze.cn/v1/bot/publish',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: {
                bot_id: BOT_ID,
                connector_ids: ['1024']
            }
        });

        console.log('发布成功:', response.data);
    } catch (error) {
        console.error('发布失败:', error.response?.data || error.message);
    }
}

publishBot(); 