const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

let dbPromise = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;

  if (!dbPromise) {
    dbPromise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      bufferCommands: false,
    });
  }

  try {
    await dbPromise;
    console.log("MongoDB connected");
  } catch (err) {
    dbPromise = null;
    throw err;
  }
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

app.use("/api/tasks", taskRoutes);

if (require.main === module) {
  connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running");
    });
  });
}

module.exports = app;