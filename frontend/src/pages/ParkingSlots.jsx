import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
  Chip,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { parkingAPI, bookingAPI } from '../services/api';

const ParkingSlots = () => {
  const [slots, setSlots] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter');
  const [bookingDialog, setBookingDialog] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingData, setBookingData] = useState({
    vehicleNumber: '',
    vehicleType: 'car',
    bookingType: 'open',
    plannedHours: 1
  });
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await parkingAPI.getAllSlots();

      setSlots(response.data.slots);
      filterSlots(response.data.slots, filter);
    } catch (error) {
      console.error('Error fetching slots:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSlots = (allSlots, filterType) => {
    if (!filterType || filterType === 'all') {
      setFilteredSlots(allSlots);
    } else {
      setFilteredSlots(allSlots.filter(slot => slot.status === filterType));
    }
  };

  useEffect(() => {
    if (slots.length > 0) {
      filterSlots(slots, filter);
    }
  }, [filter, slots]);

  const handleBookSlot = (slot) => {
    setSelectedSlot(slot);
    setBookingDialog(true);
  };

  const handleBookingSubmit = async () => {
    if (!bookingData.vehicleNumber.trim()) {
      setMessage('Please enter vehicle number');
      return;
    }
    
    try {
      const response = await bookingAPI.createBooking({
        slotId: selectedSlot._id,
        ...bookingData
      });
      
      setMessage(`Booking successful! Entry time: ${new Date().toLocaleString()}`);
      setBookingDialog(false);
      setBookingData({ vehicleNumber: '', vehicleType: 'car', bookingType: 'open', plannedHours: 1 });
      fetchSlots();
    } catch (error) {
      console.error('Booking error:', error);
      setMessage(error.response?.data?.message || 'Booking failed');
    }
  };

  const handleExit = async (bookingInfo) => {
    try {
      const response = await bookingAPI.exitParking(bookingInfo.bookingId);
      setMessage(`Vehicle exited successfully! Total amount: ₹${response.data.totalAmount}`);
      fetchSlots();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Exit failed');
    }
  };

  const getSlotColor = (status) => {
    switch (status) {
      case 'available': return '#4caf50';
      case 'occupied': return '#ff9800';
      case 'blocked': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getStatusChip = (status) => {
    const colors = {
      available: 'success',
      occupied: 'warning',
      blocked: 'error'
    };
    
    const getLabel = (status) => {
      if (status === 'blocked' && user.role === 'user') {
        return 'UNDER MAINTENANCE';
      }
      return status.toUpperCase();
    };
    
    return (
      <Chip 
        label={getLabel(status)} 
        color={colors[status]} 
        size="small" 
      />
    );
  };

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', py: 3, backgroundColor: '#f5f5f5', margin: 0, padding: 0 }}>
      <Box sx={{ width: '100%', maxWidth: '1200px', px: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        <Typography variant="h4" gutterBottom color="primary">
          {filter && filter !== 'all' ? `${filter.charAt(0).toUpperCase() + filter.slice(1)} Slots` : 'Parking Slots'}
        </Typography>
        
        {filter && (
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Showing {filteredSlots.length} {filter === 'all' ? '' : filter} slots
          </Typography>
        )}

        {message && (
          <Alert 
            severity={message.includes('successful') ? 'success' : 'error'} 
            sx={{ mb: 2 }}
            onClose={() => setMessage('')}
          >
            {message}
          </Alert>
        )}

        <Grid container spacing={2}>
          {filteredSlots.map((slot, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={slot._id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card 
                  elevation={4}
                  sx={{ 
                    height: 200,
                    border: `3px solid ${getSlotColor(slot.status)}`,
                    cursor: slot.status === 'available' && user.role === 'user' ? 'pointer' : 'default',
                    '&:hover': {
                      transform: slot.status === 'available' && user.role === 'user' ? 'scale(1.02)' : 'none',
                      transition: 'transform 0.2s'
                    }
                  }}
                  onClick={() => slot.status === 'available' && user.role === 'user' && handleBookSlot(slot)}
                >
                  <CardContent sx={{ 
                    textAlign: 'center', 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: slot.status === 'occupied' ? 'flex-start' : 'center',
                    overflowY: slot.status === 'occupied' ? 'auto' : 'visible',
                    padding: '16px !important',
                    '&::-webkit-scrollbar': {
                      width: '0px',
                      background: 'transparent'
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'transparent'
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'transparent'
                    },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {slot.slotNumber}
                    </Typography>
                    
                    <Box mb={2}>
                      {getStatusChip(slot.status)}
                    </Box>
                    
                    <Typography variant="body2" color="textSecondary">
                      Floor: {slot.floor} | Section: {slot.section}
                    </Typography>
                    
                    <Typography variant="body2" color="textSecondary">
                      Type: {slot.type}
                    </Typography>
                    
                    {slot.currentBooking && (
                      <Box mt={1}>
                        <Typography variant="body2" color="textSecondary">
                          Vehicle: {slot.currentBooking.vehicleNumber}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Entry: {new Date(slot.currentBooking.entryTime).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Duration: {slot.currentBooking.duration}h
                        </Typography>
                      </Box>
                    )}
                    
                    {slot.status === 'available' && user.role === 'user' && (
                      <Button 
                        variant="contained" 
                        size="small" 
                        sx={{ mt: 2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookSlot(slot);
                        }}
                      >
                        Book Now
                      </Button>
                    )}
                    
                    {slot.status === 'occupied' && slot.currentBooking && (
                      <Button 
                        variant="contained" 
                        color="secondary"
                        size="small" 
                        sx={{ mt: 2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                
                          handleExit(slot.currentBooking);
                        }}
                      >
                        Exit Now
                      </Button>
                    )}
                    
                    {slot.status === 'occupied' && !slot.currentBooking && (
                      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        No booking data
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Booking Dialog */}
        <Dialog open={bookingDialog} onClose={() => setBookingDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Book Parking Slot {selectedSlot?.slotNumber}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Vehicle Number"
              placeholder="e.g., AP09AB1234 or AP-09-AB-1234"
              value={bookingData.vehicleNumber}
              onChange={(e) => setBookingData({...bookingData, vehicleNumber: e.target.value})}
              margin="normal"
              helperText="Indian format: XX00XX0000 (State-District-Series-Number)"
              required
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Vehicle Type</InputLabel>
              <Select
                value={bookingData.vehicleType}
                onChange={(e) => setBookingData({...bookingData, vehicleType: e.target.value})}
                label="Vehicle Type"
              >
                <MenuItem value="car">Car</MenuItem>
                <MenuItem value="bike">Bike</MenuItem>
                <MenuItem value="truck">Truck</MenuItem>
                <MenuItem value="bus">Bus</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Booking Type</InputLabel>
              <Select
                value={bookingData.bookingType}
                onChange={(e) => setBookingData({...bookingData, bookingType: e.target.value})}
                label="Booking Type"
              >
                <MenuItem value="open">Not Sure How Long? Choose This!</MenuItem>
                <MenuItem value="planned">Know Your Parking Time? Choose This!</MenuItem>
              </Select>
            </FormControl>
            
            {bookingData.bookingType === 'planned' && (
              <TextField
                fullWidth
                label="Planned Hours"
                type="number"
                value={bookingData.plannedHours}
                onChange={(e) => setBookingData({...bookingData, plannedHours: parseInt(e.target.value)})}
                margin="normal"
                inputProps={{ min: 1, max: 72 }}
                helperText="How many hours do you plan to park?"
              />
            )}
            
            <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={1}>
              <Typography variant="body2" color="textSecondary">
                <strong>Pricing:</strong><br/>
                • 0-3 hours: ₹10<br/>
                • 3-8 hours: ₹10 + ₹25/hour<br/>
                • 8+ hours: ₹10 only
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setBookingDialog(false)}>Cancel</Button>
            <Button onClick={handleBookingSubmit} variant="contained">
              Confirm Booking
            </Button>
          </DialogActions>
        </Dialog>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ParkingSlots;