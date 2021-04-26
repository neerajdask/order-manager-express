const admin = require('firebase-admin');

const serviceAccount = require('../config/serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://construyo-coding-challenge.firebaseio.com',
});

module.exports = admin;
