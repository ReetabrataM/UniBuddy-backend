const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  name: String,

  college: String,

  city: String,

  gender: String,

  budget: Number,

  bio: String,
});

module.exports = mongoose.model("UserProfile", userProfileSchema);