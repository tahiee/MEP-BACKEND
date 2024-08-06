const express = require('express');
const router = express.Router();
const multer = require('multer');
const Event = require('../models/EventSchema');
const Authtoken = require('../middleware/auth')
const jwt = require('jsonwebtoken');

// Multer configuration for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// @route   POST /api/auth/createevent
// @desc    Create a new event
// @access  Public

router.post('/createevent', Authtoken, upload.single('banner'), async (req, res) => {
    try {
        const { eventname, eventdate, description, audience, type, price, tech, agenda, hostname, email, country, address, city, website, instagram } = req.body;

        // Log the request body and file details
        console.log('Request Body:', req.body);
        if (req.file) {
            console.log('Banner File:', req.file);
        }

        // Validate required fields
        if (!eventname) {
            return res.status(400).json({ error: 'Please fill all required fields' });
        }

        const event = new Event({
            eventname,
            eventdate,
            description,
            banner: req.file ? {
                data: req.file.buffer,
                contentType: req.file.mimetype
            } : undefined,
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
            socialLinks: {
                website,
                instagram,
            },
        });

        await event.save();

        res.json({ message: 'Event created successfully!' });
    } catch (error) {
        console.error('Create Event Error:', error.message); // Improved error logging
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Middleware to authenticate token and set req.user
const Authtoken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};
router.get('/myevents', Authtoken, async (req, res) => {
    try {
      // Find events where the user ID matches the logged-in user
      const events = await Event.find({ userId: req.user.id });
      
      res.json(events);
    } catch (error) {
      console.error('Get Events Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
