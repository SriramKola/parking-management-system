const mongoose = require('mongoose');
const User = require('../models/User');
const ParkingSlot = require('../models/ParkingSlot');
const Booking = require('../models/Booking');
require('dotenv').config();

const testBooking = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Find a user and available slot
        const user = await User.findOne({ role: 'user' });
        const slot = await ParkingSlot.findOne({ status: 'available' });

        if (!user) {
            console.log('No user found. Please register a user first.');
            return;
        }

        if (!slot) {
            console.log('No available slot found.');
            return;
        }

        console.log('User:', user.name, user.email);
        console.log('Slot:', slot.slotNumber);

        // Create booking with proper format
        const booking = await Booking.create({
            user: user._id,
            parkingSlot: slot._id,
            vehicleNumber: 'AP09AB1234',
            vehicleType: 'car'
        });

        // Update slot status
        await ParkingSlot.findByIdAndUpdate(slot._id, { status: 'occupied' });

        console.log('Test booking created:', booking._id);
        console.log('Vehicle:', booking.vehicleNumber);
        console.log('Slot updated to occupied');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.disconnect();
    }
};

testBooking();