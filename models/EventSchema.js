const mongoose = require("mongoose");

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
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("eventdetails", eventSchema);
