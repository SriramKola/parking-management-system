const mongoose = require('mongoose');
const ParkingSlot = require('../models/ParkingSlot');
require('dotenv').config();

const createGroundFloorSlots = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing ground floor slots
        await ParkingSlot.deleteMany({ floor: 0 });
        
        const slots = [];
        
        // Section A: Slots A01-A20 (Standard)
        for (let i = 1; i <= 20; i++) {
            slots.push({
                slotNumber: `A${i.toString().padStart(2, '0')}`,
                type: 'standard',
                floor: 0,
                section: 'A'
            });
        }
        
        // Section B: Slots B01-B20 (Standard)
        for (let i = 1; i <= 20; i++) {
            slots.push({
                slotNumber: `B${i.toString().padStart(2, '0')}`,
                type: 'standard',
                floor: 0,
                section: 'B'
            });
        }
        
        // Section C: Slots C01-C15 (Standard)
        for (let i = 1; i <= 15; i++) {
            slots.push({
                slotNumber: `C${i.toString().padStart(2, '0')}`,
                type: 'standard',
                floor: 0,
                section: 'C'
            });
        }
        
        // VIP Section: V01-V05
        for (let i = 1; i <= 5; i++) {
            slots.push({
                slotNumber: `V${i.toString().padStart(2, '0')}`,
                type: 'vip',
                floor: 0,
                section: 'VIP'
            });
        }
        
        // Disabled Section: D01-D03
        for (let i = 1; i <= 3; i++) {
            slots.push({
                slotNumber: `D${i.toString().padStart(2, '0')}`,
                type: 'disabled',
                floor: 0,
                section: 'DISABLED'
            });
        }

        await ParkingSlot.insertMany(slots);
        console.log(`Created ${slots.length} ground floor parking slots`);
        
        mongoose.connection.close();
    } catch (error) {
        console.error('Error creating slots:', error);
        mongoose.connection.close();
    }
};

createGroundFloorSlots();