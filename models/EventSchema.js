const mongoose = require("mongoose");

// Define the event schema
const eventSchema = new mongoose.Schema(
  {
    eventname: { type: String, required: true },
    eventdate: { type: Date },
    description: String,
    banner: {
      data: Buffer,
      contentType: String,
    },
    audience: String,
    type: { type: String },
    price: { type: Number },
    tech: { type: String },
    agenda: String,
    hostname: String,
    email: { type: String },
    country: String,
    address: String,
    city: String,
    website: String,
    instagram: String,
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  },
  {
    timestamps: true,
  }
);

// Create and export the model
module.exports = mongoose.model("Event", eventSchema); // Use "Event" as the model name
