const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const ParkingSlot = require('./src/models/ParkingSlot');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Create default slots if none exist
const createDefaultSlots = async () => {
    try {
        const count = await ParkingSlot.countDocuments();
        if (count === 0) {
            const defaultSlots = [
                { slotNumber: 'A01', type: 'standard', floor: 0, section: 'A' },
                { slotNumber: 'A02', type: 'standard', floor: 0, section: 'A' },
                { slotNumber: 'A03', type: 'standard', floor: 0, section: 'A' },
                { slotNumber: 'B01', type: 'standard', floor: 0, section: 'B' },
                { slotNumber: 'B02', type: 'standard', floor: 0, section: 'B' },
                { slotNumber: 'V01', type: 'vip', floor: 0, section: 'VIP' },
                { slotNumber: 'V02', type: 'vip', floor: 0, section: 'VIP' },
                { slotNumber: 'D01', type: 'disabled', floor: 0, section: 'DISABLED' }
            ];
            await ParkingSlot.insertMany(defaultSlots);
            console.log('Created 8 default parking slots');
        }
    } catch (error) {
        console.error('Error creating default slots:', error);
    }
};

setTimeout(createDefaultSlots, 2000);

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        process.env.FRONTEND_URL || 'https://your-frontend.vercel.app'
    ],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/parking', require('./src/routes/parkingRoutes'));
app.use('/api/booking', require('./src/routes/bookingRoutes'));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is busy, trying port ${PORT + 1}`);
        app.listen(PORT + 1, () => {
            console.log(`Server running on port ${PORT + 1}`);
        });
    } else {
        console.error('Server error:', err);
    }
});