const mongoose = require("mongoose");

const TradeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  symbol: String,
  tradeType: String, // BUY or SELL
  entryPrice: Number,
  exitPrice: Number,
  amount: Number,
  profitLoss: Number,
  date: { type: Date, default: Date.now },
  notes: String
});

module.exports = mongoose.model("Trade", TradeSchema);
