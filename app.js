const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Car = require('./models/car');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));
app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

// Replace "test" with your database name.
mongoose.connect('mongodb://localhost:27017/cars');


/**
 * Index Router
 */
app.get('/', function (req, res) {
  Car.find()
  .then(function (foundCars) {
    res.render('index', { autos: foundCars});
  })
  .catch(function () {
    // handle error
  })
});

/**
 * Add Car Router
 */
app.get('/add', function (req, res) {
  res.render('add');
});

app.post('/add', function (req, res) {
  let carData = req.body;
  let newCar = new Car(carData);
  newCar
    .save()
    .then(function (savedCar) {
      res.redirect('/');
    })
    .catch(function () {
    // handle error
  })
});

/**
 * Edit Car Router
 */
app.get('/edit/:id', function (req, res) {
  Car.findById(req.params.id)
    .then(function (foundCar) {
      res.render('edit', { auto: foundCar});
    })
    .catch(function () {
    // handle error
  })
});

app.post('/edit/:id', function (req, res) {
  Car.updateOne({_id: req.params.id}, req.body)
    .then(function (editedCar) {
      res.redirect('/');
    })
    .catch(function () {
    // handle error
  })
});

/**
 * Delete Car Router
 */
app.get('/delete/:id', function (req, res) {
  Car.deleteOne({ _id: req.params.id })
    .then(function () {
      res.redirect('/');
    })
    .catch(function () {
    // handle error
  })
});

app.listen(3000, function() {
  console.log('http://localhost:3000');
});