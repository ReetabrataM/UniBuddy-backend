const express = require("express");

const router = express.Router();

const Message = require("../models/Message");


// SAVE MESSAGE
router.post("/", async (req, res) => {
  try {
    const message = await Message.create(req.body);

    res.status(201).json(message);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// GET CHAT BETWEEN TWO USERS
router.get("/:senderId/:receiverId", async (req, res) => {

  try {

    const { senderId, receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        {
          senderId,
          receiverId,
        },
        {
          senderId: receiverId,
          receiverId: senderId,
        },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;