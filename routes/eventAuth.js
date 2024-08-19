const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Event = require("../models/EventSchema"); // Ensure the correct path to your model

const router = express.Router();

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Ensure this matches the payload structure
    next();
  } catch (ex) {
    res.status(400).json({ message: "Invalid token." });
  }
};

router.get("/myevents", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from the decoded token
    const events = await Event.find({ userId: userId }); // Find events by user ID
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error); // Log the error details
    res
      .status(500)
      .json({ message: "Failed to fetch events", error: error.message });
  }
});

// Create event route
router.post(
  "/createevent",
  verifyToken,
  upload.single("banner"),
  async (req, res) => {
    try {
      // Log userId to ensure it's being correctly set
      console.log("User ID from request:", req.user._id);

      const {
        eventname,
        eventdate,
        description,
        audience,
        type,
        price,
        tech,
        agenda,
        hostname,
        email,
        country,
        address,
        city,
        website,
        instagram,
      } = req.body;

      const banner = req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : null;

      // Ensure req.user._id is set
      if (!req.user || !req.user._id) {
        return res.status(400).json({ message: "User ID is missing." });
      }

      const event = new Event({
        eventname,
        eventdate,
        description,
        banner,
        audience,
        type,
        price,
        tech,
        agenda,
        hostname,
        email,
        country,
        address,
        city,
        website,
        instagram,
        userId: req.user._id, // Set userId from the decoded token
      });

      await event.save();
      res.status(201).json({ message: "Event created successfully!", event });
    } catch (error) {
      console.error("Error creating event:", error); // Log the error details
      res
        .status(500)
        .json({ message: "Failed to create event", error: error.message });
    }
  }
);

router.delete("/deleteevent/:id", verifyToken, async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    // Find the event and ensure it belongs to the logged-in user
    const event = await Event.findOneAndDelete({
      _id: eventId,
      userId: userId,
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found or not authorized to delete this event",
      });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error); // Log the error details
    res
      .status(500)
      .json({ message: "Failed to delete event", error: error.message });
  }
});

router.get("/active", async (req, res) => {
  try {
    const events = await Event.find(); // Fetch active events
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/register/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
