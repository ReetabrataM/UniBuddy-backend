const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  phone: String,

  college: String,

  city: String,

  gender: String,

  budget: Number,

  bio: String,

});

module.exports = mongoose.model(
  "Profile",
  ProfileSchema
);