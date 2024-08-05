const express = require('express');
const router = express.Router();
const multer = require('multer');
const Event = require('../models/EventSchema');

// Multer configuration for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// @route   POST /api/auth/createevent
// @desc    Create a new event
// @access  Public
router.post('/createevent', upload.single('banner'), async (req, res) => {
    try {
        const { eventname, eventdate, description, audience, type, price, tech, agenda, hostname, email, country, address, city, website, instagram} = req.body;

        // Log the request body and file details
        console.log('Request Body:', req.body);
        if (req.file) {
            console.log('Banner File:', req.file);
        }

        // Validate required fields
        if (!eventname || !eventdate || !description || !hostname || !email) {
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
            approval
        });

        await event.save();

        res.json({ message: 'Event created successfully!' });
    } catch (error) {
        console.error('Create Event Error:', error.message); // Improved error logging
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
