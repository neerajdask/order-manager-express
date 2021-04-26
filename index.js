const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const app = express();
const PORT = 3000 || process.env.port;

app.use(express.json());

app.get('/', (req, res) => {
    console.log('Hello world');

    res.send('Test');
});

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
