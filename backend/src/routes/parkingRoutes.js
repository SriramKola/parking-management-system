const express = require('express');
const {
    getAllSlots,
    createSlot,
    createBulkSlots,
    updateSlot,
    deleteSlot,
    getSlotStats
} = require('../controllers/parkingController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/slots', auth, getAllSlots);
router.get('/stats', auth, getSlotStats);
router.post('/slots', adminAuth, createSlot);
router.post('/slots/bulk', adminAuth, createBulkSlots);
router.put('/slots/:id', adminAuth, updateSlot);
router.delete('/slots/:id', adminAuth, deleteSlot);

module.exports = router;