const express = require("express");
const router = express.Router();

const Profile = require("../models/Profile");

// ============================
// GET PROFILE (by userId)
// ============================
router.get("/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.userId,
    });

    // if profile doesn't exist, return empty object (so frontend won't break)
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
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.params.userId },
      {
        $set: req.body,
      },
      {
        new: true,
        upsert: true, // 🔥 creates profile if not exists
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