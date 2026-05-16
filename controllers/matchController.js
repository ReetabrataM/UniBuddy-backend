const Candidate = require("../models/Candidate");

exports.getMatches = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};