const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const routes = require('./routes');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport-setup');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
    name: 'parking-lot-session',
    keys: ['key1', 'key2'],
  }));
  
app.use(passport.initialize());
app.use(passport.session());
const url = 'mongodb+srv://avisahney:helloworld@parkinglot.ffjbl.mongodb.net/parkinglot?retryWrites=true&w=majority';

MongoClient.connect(url, (err, client) => {
  if (err) {
    console.log('Database failed to connect');
  }
  console.log('Database connected!');
  global.db = client.db('parkinglot');
});
app.listen(3000);

console.log('Listening to port 3000');
app.use('/', routes);