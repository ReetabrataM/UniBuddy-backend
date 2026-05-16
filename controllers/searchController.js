const Candidate = require("../models/Candidate");

exports.getSearchResults = async (req, res) => {

  try {

    const q = req.query.q;

    if (!q) {
      return res.json([]);
    }

    const results = await Candidate.find({

      $or: [

        {
          name: {
            $regex: q,
            $options: "i",
          },
        },

        {
          location: {
            $regex: q,
            $options: "i",
          },
        },

      ],

    });

    res.status(200).json(results);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};