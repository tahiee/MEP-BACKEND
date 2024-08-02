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
  attendees: { type: Number },
  price: { type: Number },
  tech: { type: String },
  agenda: { type: String },
  sponsors: [{ name: String, link: String }],
  hostname: { type: String },
  eventdate: { type: Date },
  email: { type: String },
  country: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  postal: { type: String },
  socialLinks: {
    twitter: { type: String },
    linkedin: { type: String },
    website: { type: String },
    instagram: { type: String }
  },
  approval: { type: String }
});

module.exports = mongoose.model("EventDetails", eventSchema);
