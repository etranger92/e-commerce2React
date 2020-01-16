const express = require("express");
const cors = require("cors");
const stripe = require('stripe')(`${process.env.PASS}`);

//for netlify
const serverless = require("serverless-http");

//Mongo db holds your documents(datas) under the format of json structure object.
//mongoose make it easy to connect to moongose.db js
const mongoose = require("mongoose");
const router = express.Router();
const app = express();
const port = process.env.PORT || 5000;
app.use("/.netlify/functions/server", router);

// To tell to the server which folder you need to run all of the time: app.use(express.static("name of the folder"))
//these are the middleware. that will allow us to parse JSON
app.use(cors());
app.use(express.json());

//From the dashboard "the string at /connect"" of mongo DB. URI represents where our date is stored. New urlParser is the new tool to parse. We don't need to remember those.
//if (process.env.NODE_ENV !== "production") {
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}


const uri = process.env.REACT_APP_ATLAS_URI;
mongoose.connect(`${uri}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongoDB database connection established successfully");
});

//set the url address
//const usersRouter = require('./routes/users');
const shoesRouter = require("./routes/shoes");
const transactionsRouter = require("./routes/transactions");

//extension of the url to get the datas

app.use("/.netlify/functions/server/products/shoes", shoesRouter);
app.use("/.netlify/functions/server/transactions", transactionsRouter);
//app.use('/users', usersRouter);

app.listen(port, () => {
  console.log("server is running on port" + port);
});

module.exports = app;
//for netlify
module.exports.handler = serverless(app);