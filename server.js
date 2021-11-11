/*
  Main server for Haulogy website
*/
const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser')

const app = express();
app.use(parser.json() );
app.use(parser.urlencoded({ extended: true }));


const db  = mongoose.connection;
const mongoDBURL = 'mongodb://127.0.0.1/auto';
app.use(express.static('public_html'))

var Schema = mongoose.Schema;

var CustomerSchema = new Schema ({
  firstName : String,
  lastName : String,
  email : String,
  phoneNumber : Number
})

var Customers = mongoose.model("Customer", CustomerSchema) ;

mongoose.connect(mongoDBURL, { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*
 * Where a new customer is added to the database
*/
app.post("/add/", (req, res) => {
  let customerObj = JSON.parse(req.body.appointment);
  console.log(req.body);
  console.log(customerObj)

  var customer = new Customers(customerObj);
  customer.save(function (err) { if (err) console.log('an error has occured');});
});

app.get("/customers", (req, res) => {
  Customers.find({}).exec(function(error, results) {
    res.send(JSON.stringify(results, null, '\t'));
  });

});

const port = 3000;
app.listen(port, () => {
  console.log('server has started');
});
