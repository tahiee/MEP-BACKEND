const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventname: { type: String, required: true },
  description: { type: String },
  banner: {
    data: Buffer,
    contentType: String
  },
  audience: { type: String },
  type: { type: String },
  price: { type: Number },
  tech: { type: String },
  agenda: { type: String },
  hostname: { type: String },
  eventdate: { type: Date },
  email: { type: String },
  country: { type: String },
  address: { type: String },
  city: { type: String },
  socialLinks: {
    website: { type: String },
    instagram: { type: String }
  },
});

module.exports = mongoose.model("EventDetails", eventSchema);
