const express = require('express');

const admin = require('../firebase/index');

const db = admin.firestore();
const route = new express.Router();

route.get('/orders', async (req, res) => {
    const orderRef = db.collection('orders');
    const snapshot = await orderRef.get();

    let data = [];
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        data.push(doc.data());
    });
    res.status(200).send(data);
});

route.post('/orders', async (req, res) => {
    const resp = await db
        .collection('orders')
        .doc(req.body.address.city)
        .set(req.body);

    if (!resp) {
        return res.status(500).send('Something went wrong');
    }
    return res.status(200).send(resp);
});

route.put('/orders/:id', async (req, res) => {
    const docID = req.params.id;
    console.log(req.body);
    const orderRef = db.collection('orders').doc(docID);
    // const resp = await orderRef.update({ ...req.body });
});

module.exports = route;
