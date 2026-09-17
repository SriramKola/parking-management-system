const express = require('express');
const {
    createBooking,
    getUserBookings,
    getAllBookings,
    exitParking
} = require('../controllers/bookingController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createBooking);
router.get('/my-bookings', auth, getUserBookings);
router.get('/all', adminAuth, getAllBookings);
router.put('/exit/:bookingId', auth, exitParking);

module.exports = router;