const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const cors = require("cors");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/userRouter");

const PORT = process.env.PORT || 4002;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", userRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("WELCOME TO HOME PAGE");
});

app.get("/about", (req, res) => {
  res.send("this is about");
  
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

// Start server and connect to MongoDB
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectDB();
});
