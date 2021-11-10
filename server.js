/*
  Main server for Haulogy website
*/

const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser')

const app = express();

const db = mongoose.connection;
const mongoDBURL = 'mongodb://localhost/auto';

var Schema = mongoose.Schema;

var CustomerSchema = new Schema ({
  firstName : String,
  lastName : String,
  email : String,
  phoneNumber : Number
})

var Customer = mongoose.model("Customer", CustomerSchema) ;

app.use(express.static('public_html'))

mongoose.connect(mongoDBURL, { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*
 * Where a new customer is added to the database
*/
app.post("/add/", (req, res) => {
  let customerObj = JSON.parse(req.body.customer);
  var customer = new Customer(customerObj);
  customer.save(function (err) { if (err) console.log('an error has occured');});
});

const port = 3000;
app.listen(port, () => {
  console.log('server has started');
});
