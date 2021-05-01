const express = require('express');
const cors = require('cors');

const ordersRouter = require('./routes/ordersRoute');
const usersRouter = require('./routes/userRoute');

const app = express();
const PORT = 5000 || process.env.port;

app.use(express.json());

app.use(ordersRouter);
app.use(usersRouter);

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
