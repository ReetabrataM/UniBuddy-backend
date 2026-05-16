const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  college: {
    type: String,
  },

  price: {
    type: Number,
  },

  description: {
    type: String,
  },

  image: {
    type: String,
  },

});

module.exports = mongoose.model(
  "Candidate",
  candidateSchema
);