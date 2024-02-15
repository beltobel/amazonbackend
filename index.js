/* eslint-disable spaced-comment */
/* eslint-disable func-call-spacing */
const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");

// eslint-disable-next-line max-len
const stripe = require("stripe") ("sk_test_51ONgE3J6b64trkxpU3m564mF1zo8cmSEnthJF5siUmwIKVs5uPDmpQpdBFP0cVlra2ofeAieBMnFkQ5197mU0DBY00KNkfGGXk");

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
app.listen(5001, console.log("Amazon server running on port 5001"));
//  exports.api = functions.https.onRequest(app);

//http function initialized http://127.0.0.1:5001/clone-5bd7f/us-central1/api

