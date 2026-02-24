const express = require("express");
const router = express.Router();
const Trade = require("../models/Trade");

// Add Trade
router.post("/add", async (req, res) => {
  const { userId, symbol, tradeType, entryPrice, exitPrice, amount, notes } = req.body;

  try {
    const profitLoss = (exitPrice - entryPrice) * amount * (tradeType === "BUY" ? 1 : -1);

    const trade = new Trade({
      userId,
      symbol,
      tradeType,
      entryPrice,
      exitPrice,
      amount,
      profitLoss,
      notes
    });

    await trade.save();

    res.json({
      message: "Trade Added",
      trade
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch Trades by User
router.get("/:userId", async (req, res) => {
  try {
    const trades = await Trade.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(trades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
