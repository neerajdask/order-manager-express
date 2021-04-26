const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

const serviceAccount = require('./config/serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://construyo-coding-challenge.firebaseio.com',
});

const app = express();
const PORT = 3000 || process.env.port;

app.use(express.json());
const db = admin.firestore();

app.post('/orders', async (req, res) => {
    const resp = await db
        .collection('orders')
        .doc(req.body.address.city)
        .set(req.body);

    console.log(resp);
    if (!resp) {
        return res.status(500).send('Something went wrong');
    }
    return res.status(200).send(resp);
});

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
