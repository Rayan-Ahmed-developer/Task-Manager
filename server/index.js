const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB connected");
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

if (require.main === module) {
  connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running");
    });
  });
}

module.exports = app;