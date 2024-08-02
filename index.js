const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const multer = require('multer');
const Event = require('./models/EventSchema');


const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Hello World! 🌐');
});


// Multer configuration for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/createevent', upload.single('banner'), async (req, res) => {
  try {
    const event = new Event({
      eventname: req.body.eventname,
      description: req.body.description,
      banner: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      },
      audience: req.body.audience,
      type: req.body.type,
      attendees: req.body.attendees,
      price: req.body.price,
      tech: req.body.tech,
      agenda: req.body.agenda,
      sponsors: req.body.sponsors,
      hostname: req.body.hostname,
      eventdate: req.body.eventdate,
      email: req.body.email,
      country: req.body.country,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      postal: req.body.postal,
      socialLinks: req.body.socialLinks,
      approval: req.body.approval
    });

    await event.save();
    res.status(201).send('Event created successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }

    mongoose.connection.on('error', (err) => {
        console.error(`MongoDB connection error: ${err}`);
    });
};

connectDB();

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
