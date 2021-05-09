const express = require("express");

const admin = require("../firebase/index");

const db = admin.firestore();
const route = new express.Router();

route.get("/users", async (req, res) => {
  const usersRef = db.collection("users");
  const snapshot = await usersRef.get();

  let data = [];
  snapshot.forEach((doc) => {
    data.push(doc.data());
  });
  res.status(200).send(data);
});

route.get("/users/:id", async (req, res) => {
  const usersRef = db.collection("users").doc(req.params.id);
  const doc = await usersRef.get();

  if (!doc.exists) {
    res.status(404).send({
      error: "Not found",
    });
  } else {
    res.status(200).send(doc.data());
  }
});

module.exports = route;
