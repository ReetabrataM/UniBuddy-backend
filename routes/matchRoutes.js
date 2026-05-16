const express = require("express");
const router = express.Router();

const Candidate = require("../models/Candidate");
const Request = require("../models/Request");

// ✅ AUTH MIDDLEWARE
// IMPORTANT: use ../ not /
const auth = require("../middleware/authMiddleware");


// ✅ GET all candidates
router.get("/", async (req, res) => {
  try {
    const { college } = req.query;

    let query = {};

    if (college) {
      query.college = college;
    }

    const candidates = await Candidate.find(query);
    res.json(candidates);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// ✅ SEED candidates
router.get("/seed", async (req, res) => {
  try {

    await Candidate.deleteMany();

    await Candidate.insertMany([
      {
        name: "Rahul Sharma",
        college: "Tech University"
      },
      {
        name: "Ananya Gupta",
        college: "City College"
      },
      {
        name: "Arjun Verma",
        college: "National Institute"
      }
    ]);

    res.send("Data seeded successfully");

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// ✅ CREATE REQUEST
router.post("/request", async (req, res) => {
  try {

    const newRequest = new Request(req.body);

    await newRequest.save();

    res.json(newRequest);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// ✅ PROTECTED ROUTE EXAMPLE
router.get("/protected", auth, async (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});


module.exports = router;