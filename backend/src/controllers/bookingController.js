const Booking = require('../models/Booking');
const ParkingSlot = require('../models/ParkingSlot');

const createBooking = async (req, res) => {
    try {
        const { slotId, vehicleNumber, vehicleType } = req.body;

        if (!vehicleNumber || vehicleNumber.trim().length < 2) {
            return res.status(400).json({ message: 'Please enter a valid vehicle number' });
        }

        // Clean and format vehicle number
        const cleanVehicleNumber = vehicleNumber.toUpperCase().trim().replace(/[^A-Z0-9]/g, '');
        
        // Accept any reasonable format - just check basic structure
        if (cleanVehicleNumber.length < 6) {
            return res.status(400).json({ 
                message: 'Vehicle number too short. Please enter a valid number.' 
            });
        }

        const slot = await ParkingSlot.findById(slotId);
        if (!slot || slot.status !== 'available') {
            return res.status(400).json({ message: 'Slot not available' });
        }

        const existingBooking = await Booking.findOne({
            vehicleNumber: cleanVehicleNumber,
            status: 'active'
        });

        if (existingBooking) {
            return res.status(400).json({ message: 'Vehicle already has an active booking' });
        }
        
        const booking = await Booking.create({
            user: req.user.id,
            parkingSlot: slotId,
            vehicleNumber: cleanVehicleNumber,
            vehicleType
        });
        


        await ParkingSlot.findByIdAndUpdate(slotId, { status: 'occupied' });

        const populatedBooking = await Booking.findById(booking._id)
            .populate('parkingSlot')
            .populate('user', 'name email');

        res.status(201).json({ success: true, booking: populatedBooking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate('parkingSlot')
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('parkingSlot')
            .populate('user', 'name email phone')
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const exitParking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findById(bookingId);
        if (!booking || booking.status !== 'active') {
            return res.status(400).json({ message: 'Invalid booking' });
        }

        if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const exitTime = new Date();
        const durationMs = exitTime - booking.entryTime;
        const durationHours = Math.max(0.1, durationMs / (1000 * 60 * 60)); // Convert to hours
        
        let totalAmount;
        if (durationHours > 8) {
            totalAmount = 10; // Above 8 hours: only ₹10 base price
        } else if (durationHours <= 3) {
            totalAmount = 10; // First 3 hours: ₹10
        } else {
            const extraHours = Math.ceil(durationHours - 3);
            totalAmount = 10 + (extraHours * 25); // ₹10 + ₹25 per extra hour
        }
        
        const durationMinutes = Math.ceil(durationMs / (1000 * 60));

        await Booking.findByIdAndUpdate(bookingId, {
            exitTime,
            status: 'completed',
            totalAmount,
            duration: durationHours
        });

        await ParkingSlot.findByIdAndUpdate(booking.parkingSlot, { status: 'available' });

        res.json({ success: true, message: 'Vehicle exited successfully', totalAmount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    getUserBookings,
    getAllBookings,
    exitParking
};