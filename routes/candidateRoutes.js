const express = require("express");

const router = express.Router();

const Candidate = require("../models/Candidate");


// ✅ GET ALL CANDIDATES
router.get("/", async (req, res) => {

  try {

    const candidates = await Candidate.find();

    res.json(candidates);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});


// ✅ GET SINGLE CANDIDATE
router.get("/:id", async (req, res) => {

  try {

    const candidate = await Candidate.findById(
      req.params.id
    );

    res.json(candidate);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});


module.exports = router;