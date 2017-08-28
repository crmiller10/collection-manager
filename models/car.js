const mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  body: {
    bodyStyle: {
      type: String,
      enum: [
        "",
        "sedan",
        "coupe",
        "suv",
        "crossover",
        "convertible",
        "truck",
        "van"
      ]
    },
    color: String,
  },
    condition: {
      type: String,
      enum: [
        "",
        "new",
        "refurbished",
        "used-likeNew",
        "used-veryGood",
        "used-good",
        "used-acceptable"
      ]
    }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;