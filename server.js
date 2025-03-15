require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const speakerRoutes = require('./routes/speakerRoutes');
const sponsorRoutes = require('./routes/sponsorRoutes');

//const sponsorRoutes = require('./routes/sponsorRoutes');

const app = express();

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors());
app.use(express.json());



// Routes

app.use('/api/events', eventRoutes);
app.use('/api/speakers', speakerRoutes);
app.use('/api/sponsors', sponsorRoutes);
//app.use('/api/sponsors', sponsorRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));









