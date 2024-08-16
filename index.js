const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const createEventRoute = require("./routes/eventAuth");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
const PORT = 4001;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/events", createEventRoute);

app.get("/", (req, res) => {
  res.status(200).send("Hello World! 🌐");
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  mongoose.connection.on("error", (err) => {
    console.error(`MongoDB connection error: ${err}`);
  });
};

connectDB();

// Start the server
