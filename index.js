const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const createEventRoute = require("./routes/eventAuth");
const myEvents = require("./routes/eventAuth");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes );
app.use("/api/auth",createEventRoute );
app.use("/api/auth", myEvents);

app.get("/", (req, res) => {
    res.status(200).send("Hello World! 🌐");
});

// app.post('/createevent', upload.single('banner'), async (req, res) => {
//   try {
//     const event = new Event({
//       eventname: req.body.eventname,
//       eventdate: req.body.eventdate,
//       description: req.body.description,
//       banner: {
//         data: req.file.buffer,
//         contentType: req.file.mimetype
//       },
//       audience: req.body.audience,
//       type: req.body.type,
//       price: req.body.price,
//       tech: req.body.tech,
//       agenda: req.body.agenda,
//       sponsors: req.body.sponsors,
//       hostname: req.body.hostname,
//       email: req.body.email,
//       country: req.body.country,
//       address: req.body.address,
//       city: req.body.city,
//       socialLinks: req.body.socialLinks,
//       approval: req.body.approval
//     });

//     await event.save();
//     res.json({ message: 'Event created successfully!' });
//     res.status(201).send('Event created successfully');
//   } catch (error) {
//     res.status(500).send(error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Connect to MongoDB

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected...");
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }

    mongoose.connection.on("error", (err) => {
        console.error(`MongoDB connection error: ${err}`);
    });
};

connectDB();

// Start the server
