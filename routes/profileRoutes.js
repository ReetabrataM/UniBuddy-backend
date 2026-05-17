const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Profile = require("../models/Profile");

// =========================
// GET PROFILE
// =========================
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // safety check
    if (!userId || userId === "undefined") {
      return res.status(400).json({
        message: "Invalid userId",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid ObjectId format",
      });
    }

    const profile = await Profile.findOne({ user: userId });

    return res.json(profile || {});
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

// =========================
// UPDATE / CREATE PROFILE
// =========================
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // safety check
    if (!userId || userId === "undefined") {
      return res.status(400).json({
        message: "Invalid userId",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid ObjectId format",
      });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          ...req.body,
          user: userId, // ensure always set
        },
      },
      {
        new: true,
        upsert: true, // create if not exists
      }
    );

    return res.json(updatedProfile);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;