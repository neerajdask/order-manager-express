const express = require("express");
const cors = require("cors");

const ordersRouter = require("./routes/ordersRoute");
const usersRouter = require("./routes/userRoute");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(ordersRouter);
app.use(usersRouter);

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
