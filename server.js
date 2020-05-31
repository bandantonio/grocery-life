const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const bot = require('./src/bot');

app.get('/', (req, res) => {
    res.json({
        message: 'Grocery Life Bot was launched successfully',
        status: 200
    })
});

app.post('/' + process.env.TELEGRAM_BOT_TOKEN, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

app.listen(process.env.PORT, () => {
    console.log(`Grocery Life Bot is listening on port ${process.env.PORT}`);
});