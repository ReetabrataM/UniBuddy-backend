const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  fromDate: String,
  toDate: String,
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Request", requestSchema);