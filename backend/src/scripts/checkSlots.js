const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const ParkingSlot = require('../models/ParkingSlot');

const checkSlots = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        const slots = await ParkingSlot.find({});
        console.log(`Found ${slots.length} slots:`);
        slots.forEach(slot => {
            console.log(`- ${slot.slotNumber} (${slot.type}) - ${slot.status}`);
        });
        
        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        mongoose.connection.close();
    }
};

checkSlots();