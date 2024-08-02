const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Hey');
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
