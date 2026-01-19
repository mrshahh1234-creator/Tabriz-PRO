const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const BOT_TOKEN = '7927717291:AAG4h_LbZoY-1s2y0_zzNoCFudrU7pPDNas';
const MY_ID = '1015769230';

app.post('/api/send-order', async (req, res) => {
    const { user, material, edge, details } = req.body;

    let text = `🔥 **НОВЫЙ ЗАКАЗ ИЗ САЙТА**\n\n`;
    text += `👤 **Мастер:** ${user.name}\n`;
    text += `📞 **Телефон:** [${user.phone}](tel:${user.phone})\n`;
    text += `───────────────────\n`;
    text += `🪵 **Материал:** ${material}\n`;
    text += `🧵 **Кромка:** ${edge.name} (${edge.thick})\n`;
    text += `───────────────────\n\n`;

    details.forEach((d, i) => {
        const edgeSides = d.e.length > 0 ? `Кромка: ${d.e.join(', ')}` : 'Без кромки';
        text += `🔹 ${i + 1}. **${d.n}**\n`;
        text += `   📐 ${d.l} × ${d.w} мм — **${d.c} шт.**\n`;
        text += `   📍 ${edgeSides}\n\n`;
    });

    try {
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: MY_ID,
            text: text,
            parse_mode: 'Markdown'
        });
        res.status(200).json({ success: true });
    } catch (e) {
        console.error(e);
        res.status(500).send("Error");
    }
});

app.listen(3000, () => console.log('Backend on port 3000'));