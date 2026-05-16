const Message = require("../models/Message");


// SEND MESSAGE
exports.sendMessage = async (req, res) => {

  try {

    const { sender, receiver, text } = req.body;

    const newMessage = new Message({
      sender,
      receiver,
      text,
    });

    await newMessage.save();

    res.status(201).json(newMessage);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};


// GET CONVERSATION
exports.getConversation = async (req, res) => {

  try {

    const { senderId, receiverId } = req.params;

    const messages = await Message.find({

      $or: [

        {
          sender: senderId,
          receiver: receiverId,
        },

        {
          sender: receiverId,
          receiver: senderId,
        },

      ],

    }).sort({ createdAt: 1 });

    res.json(messages);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};