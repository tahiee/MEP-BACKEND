const mongoose = require("mongoose");

// Define the event schema
const eventSchema = new mongoose.Schema({
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
  userEmail: { type: String } // Store user email instead of ObjectId
}, {
  timestamps: true 
});

// Create and export the model
module.exports = mongoose.model("Event", eventSchema); // Use "Event" as the model name
