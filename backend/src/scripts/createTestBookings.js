const mongoose = require('mongoose');
const User = require('../models/User');
const ParkingSlot = require('../models/ParkingSlot');
const Booking = require('../models/Booking');
require('dotenv').config();

const createTestBookings = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Find a test user and available slot
        const user = await User.findOne({ role: 'user' });
        const slot = await ParkingSlot.findOne({ status: 'available' });

        if (!user || !slot) {
            console.log('Need at least one user and one available slot');
            return;
        }

        // Create test booking
        const booking = await Booking.create({
            user: user._id,
            parkingSlot: slot._id,
            vehicleNumber: 'ABC123',
            vehicleType: 'car'
        });

        // Update slot status
        await ParkingSlot.findByIdAndUpdate(slot._id, { status: 'occupied' });

        console.log('Test booking created:', booking);
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.disconnect();
    }
};

createTestBookings();