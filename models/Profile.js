const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  name: String,
  email: String,

  phone: String,
  college: String,
  course: String,
  year: String,
  location: String,
  gender: String,

  bio: String,

  profilePhoto: String,

  lookingForPg: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);