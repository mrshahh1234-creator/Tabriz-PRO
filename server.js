const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const BOT_TOKEN = '7927717291:AAG4h_LbZoY-1s2y0_zzNoCFudrU7pPDNas';
const MY_ID = '1015769230';

app.post('/api/send-order', async (req, res) => {
    const { master, material, edgeName, edgeThickness, details } = req.body;

    let text = `💎 **НОВЫЙ ЗАКАЗ НА РАСПИЛ**\n\n`;
    text += `👤 **Мастер:** ${master}\n`;
    text += `🪵 **Материал:** ${material}\n`;
    text += `🧵 **Кромка:** ${edgeName} (${edgeThickness})\n`;
    text += `───────────────────\n`;

    details.forEach((d, i) => {
        const edgeStr = d.edges.length > 0 ? `Кромка: ${d.edges.join(', ')}` : 'Без кромки';
        text += `🔹 ${i + 1}. ${d.name}\n`;
        text += `   📐 ${d.len} × ${d.width} мм — **${d.count} шт.**\n`;
        text += `   📍 ${edgeStr}\n\n`;
    });

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: MY_ID,
            text: text,
            parse_mode: 'Markdown'
        });
        res.status(200).json({ success: true });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.listen(3000, () => console.log('Server started on port 3000'));