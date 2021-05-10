const express = require("express");
const _ = require("lodash");

const admin = require("../firebase/index");

const db = admin.firestore();
const route = new express.Router();

route.get("/orders", async (req, res) => {
  const orderRef = db.collection("orders");
  const snapshot = await orderRef.get();

  let data = [];
  snapshot.forEach((doc) => {
    data.push(doc.data());
    data = data.filter((order) => {
      if (order.uid) {
        return order;
      }
    });
  });

  if (!snapshot || !data) {
    return res.status(404).send({
      error: "No data found.",
    });
  }

  uniqueOrdersByID = _.uniqBy(data, "uid");
  res.status(200).send(uniqueOrdersByID);
});

route.post("/orders", async (req, res) => {
  const addResp = await db.collection("orders").add({
    ...req.body,
  });
  if (!addResp) {
    return res.status(422).send({
      error: "Something went wrong. Could not add the order.",
    });
  }
  const orderRef = db.collection("orders").doc(addResp.id.toString());
  const updateResp = await orderRef.update({
    uid: addResp.id,
  });
  return res.status(200).send({ addResp, updateResp });
});

route.put("/orders/:id", async (req, res) => {
  const docID = req.params.id;
  const orderRef = db.collection("orders").doc(docID);

  const resp = await orderRef.update({
    title: req.body.title,
    bookingDate: req.body.bookingDate,
  });

  if (!resp) {
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
  res.status(200).send(resp);
});

module.exports = route;
