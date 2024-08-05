const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventname: { type: String, required: true, index: true },
  description: { type: String },
  banner: {
    data: Buffer,
    contentType: String
  },
  audience: { type: String, default: 'General' },
  type: { type: String, },
  price: { type: Number, default: 0 },
  tech: { type: String },
  agenda: { type: String },
  hostname: { type: String, },
  eventdate: { type: Date, },
  email: { type: String, match: /.+\@.+\..+/ },
  country: { type: String, },
  address: { type: String },
  city: { type: String },
  socialLinks: {
    website: { type: String },
    instagram: { type: String }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EventDetails', eventSchema);
