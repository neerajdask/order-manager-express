const express = require("express");

const admin = require("../firebase/index");

const db = admin.firestore();
const route = new express.Router();

route.get("/users", async (req, res) => {
  const usersRef = db.collection("users");
  const snapshot = await usersRef.get();

  let data = [];
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
    data.push(doc.data());
  });
  res.status(200).send(data);
});

route.get("/users/:id", async (req, res) => {
  console.log(req.params.id);
  const usersRef = db.collection("users").doc(req.params.id);
  const doc = await usersRef.get();

  if (!doc.exists) {
    console.log("No such document!");
    res.status(404).send('Not found');
  } else {
    console.log("Document data:", doc.data());
    res.status(200).send(doc.data());
  }

  // let data = [];
  // snapshot.forEach((doc) => {
  //     console.log(doc.id, '=>', doc.data());
  //     data.push(doc.data());
  // });
 
});

module.exports = route;
