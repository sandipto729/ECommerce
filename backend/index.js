const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/index');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON bodies with increased size limit
app.use(express.json({ limit: '50mb' })); // Set the limit as needed
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Set the limit as needed

// Update CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL, // Allow requests from this origin
    credentials: true // Allow cookies to be sent
}));
app.use(cookieParser());

// Use the user routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
