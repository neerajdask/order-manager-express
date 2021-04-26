const express = require('express');

const admin = require('../firebase/index');

const db = admin.firestore();
const route = new express.Router();

route.get('/users', async (req, res) => {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();

    let data = [];
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        data.push(doc.data());
    });
    res.status(200).send(data);
});

module.exports = route;
