const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const ParkingSlot = require('../models/ParkingSlot');

const createDefaultSlots = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
        
        const existingSlots = await ParkingSlot.countDocuments();
        if (existingSlots > 0) {
            console.log('Slots already exist');
            return;
        }

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
        console.log(`Created ${defaultSlots.length} default parking slots`);
        
        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        mongoose.connection.close();
    }
};

createDefaultSlots();