const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Profile = require("../models/Profile");

// ============================
// GET PROFILE (by userId)
// ============================
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // 🔥 VALIDATION FIX
    if (!userId || userId === "undefined") {
      return res.status(400).json({
        message: "Invalid userId",
      });
    }

    // 🔥 ObjectId safety check (IMPORTANT)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid ObjectId format",
      });
    }

    const profile = await Profile.findOne({
      user: userId,
    });

    if (!profile) {
      return res.json({});
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ============================
// UPDATE PROFILE (by userId)
// ============================
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // 🔥 VALIDATION FIX
    if (!userId || userId === "undefined") {
      return res.status(400).json({
        message: "Invalid userId received",
      });
    }

    // 🔥 ObjectId safety check
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid ObjectId format",
      });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: req.body },
      {
        new: true,
        upsert: true,
      }
    );

    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;