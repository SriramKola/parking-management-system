const mongoose = require('mongoose');
const ParkingSlot = require('../models/ParkingSlot');
const Booking = require('../models/Booking');
require('dotenv').config();

const cleanupSlots = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Find all occupied slots
        const occupiedSlots = await ParkingSlot.find({ status: 'occupied' });
        console.log(`Found ${occupiedSlots.length} occupied slots`);

        for (const slot of occupiedSlots) {
            // Check if there's an active booking for this slot
            const activeBooking = await Booking.findOne({
                parkingSlot: slot._id,
                status: 'active'
            });

            if (!activeBooking) {
                // No active booking found, reset slot to available
                await ParkingSlot.findByIdAndUpdate(slot._id, { status: 'available' });
                console.log(`Reset slot ${slot.slotNumber} to available (no active booking)`);
            } else {
                console.log(`Slot ${slot.slotNumber} has active booking by ${activeBooking.vehicleNumber}`);
            }
        }

        console.log('Cleanup completed');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        mongoose.disconnect();
    }
};

cleanupSlots();