const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const authRoutes = require("./routes/auth");
const tradeRoutes = require("./routes/trades");

app.use("/api/auth", authRoutes);
app.use("/api/trades", tradeRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log("Server running on port " + PORT);
});
