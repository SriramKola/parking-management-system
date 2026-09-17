const mongoose = require('mongoose');

const parkingSlotSchema = new mongoose.Schema({
    slotNumber: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['standard', 'disabled', 'vip'],
        default: 'standard'
    },
    status: {
        type: String,
        enum: ['available', 'occupied', 'blocked'],
        default: 'available'
    },
    floor: {
        type: Number,
        default: 1
    },
    section: {
        type: String,
        default: 'A'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ParkingSlot', parkingSlotSchema);