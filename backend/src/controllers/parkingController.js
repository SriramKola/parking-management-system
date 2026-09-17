const ParkingSlot = require('../models/ParkingSlot');

const getAllSlots = async (req, res) => {
    try {
        const Booking = require('../models/Booking');
        const slots = await ParkingSlot.find({ isActive: true });
        
        // Add booking info for occupied slots
        const slotsWithBookings = await Promise.all(slots.map(async (slot) => {
            if (slot.status === 'occupied') {
                const booking = await Booking.findOne({ 
                    parkingSlot: slot._id, 
                    status: 'active' 
                }).populate('user', 'name');
                

                
                return {
                    ...slot.toObject(),
                    currentBooking: booking ? {
                        bookingId: booking._id,
                        userId: booking.user?._id,
                        vehicleNumber: booking.vehicleNumber,
                        entryTime: booking.entryTime,
                        userName: booking.user?.name,
                        duration: ((new Date() - booking.entryTime) / (1000 * 60 * 60)).toFixed(1)
                    } : {
                        bookingId: 'temp',
                        vehicleNumber: 'Unknown',
                        entryTime: new Date(),
                        duration: '0.0'
                    }
                };
            }
            return slot.toObject();
        }));
        
        res.json({ success: true, slots: slotsWithBookings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createSlot = async (req, res) => {
    try {
        const { slotNumber, type, floor, section } = req.body;

        const existingSlot = await ParkingSlot.findOne({ slotNumber });
        if (existingSlot) {
            return res.status(400).json({ message: 'Slot number already exists' });
        }

        const slot = await ParkingSlot.create({
            slotNumber,
            type,
            floor,
            section
        });

        res.status(201).json({ success: true, slot });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBulkSlots = async (req, res) => {
    try {
        const { prefix, startNumber, endNumber, type, floor, section } = req.body;
        
        const slots = [];
        const existingSlots = [];
        
        for (let i = startNumber; i <= endNumber; i++) {
            const slotNumber = `${prefix}${i.toString().padStart(2, '0')}`;
            
            const existing = await ParkingSlot.findOne({ slotNumber });
            if (existing) {
                existingSlots.push(slotNumber);
                continue;
            }
            
            slots.push({
                slotNumber,
                type,
                floor,
                section
            });
        }
        
        if (slots.length > 0) {
            await ParkingSlot.insertMany(slots);
        }
        
        res.status(201).json({ 
            success: true, 
            created: slots.length,
            skipped: existingSlots.length,
            existingSlots
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSlot = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const slot = await ParkingSlot.findByIdAndUpdate(id, updates, { new: true });
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }

        res.json({ success: true, slot });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSlot = async (req, res) => {
    try {
        const { id } = req.params;

        const slot = await ParkingSlot.findByIdAndUpdate(
            id, 
            { isActive: false }, 
            { new: true }
        );

        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }

        res.json({ success: true, message: 'Slot deactivated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSlotStats = async (req, res) => {
    try {
        const totalSlots = await ParkingSlot.countDocuments({ isActive: true });
        const availableSlots = await ParkingSlot.countDocuments({ 
            isActive: true, 
            status: 'available' 
        });
        const occupiedSlots = await ParkingSlot.countDocuments({ 
            isActive: true, 
            status: 'occupied' 
        });
        const blockedSlots = await ParkingSlot.countDocuments({ 
            isActive: true, 
            status: 'blocked' 
        });

        res.json({
            success: true,
            stats: {
                total: totalSlots,
                available: availableSlots,
                occupied: occupiedSlots,
                blocked: blockedSlots
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllSlots,
    createSlot,
    createBulkSlots,
    updateSlot,
    deleteSlot,
    getSlotStats
};