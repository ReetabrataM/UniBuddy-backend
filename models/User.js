const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // AUTH DETAILS
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "owner"],
      default: "student",
    },

    // PROFILE DETAILS
    college: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      default: "",
    },

    lookingForPg: {
      type: Boolean,
      default: false,
    },

    course: {
      type: String,
      default: "",
    },

    year: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    profilePhoto: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);