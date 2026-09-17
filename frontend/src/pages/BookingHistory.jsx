import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Box,
  Alert
} from '@mui/material';

import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { bookingAPI } from '../services/api';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = user.role === 'admin' 
        ? await bookingAPI.getAllBookings()
        : await bookingAPI.getUserBookings();
      

      setBookings(response.data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setMessage('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleExit = async (bookingId) => {
    try {
      const response = await bookingAPI.exitParking(bookingId);
      setMessage(`Vehicle exited successfully! Total amount: ₹${response.data.totalAmount}`);
      fetchBookings();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Exit failed');
    }
  };

  const getStatusChip = (status) => {
    const colors = {
      active: 'primary',
      completed: 'success',
      cancelled: 'error'
    };
    
    return (
      <Chip 
        label={status.toUpperCase()} 
        color={colors[status]} 
        size="small" 
      />
    );
  };

  const columns = [
    { field: 'slotNumber', headerName: 'Slot', width: 100 },
    { field: 'vehicleNumber', headerName: 'Vehicle', width: 130 },
    { field: 'vehicleType', headerName: 'Type', width: 100 },
    { 
      field: 'entryTime', 
      headerName: 'Entry Time', 
      width: 180,
      valueFormatter: (params) => new Date(params.value).toLocaleString()
    },
    { 
      field: 'exitTime', 
      headerName: 'Exit Time', 
      width: 180,
      valueFormatter: (params) => params.value ? new Date(params.value).toLocaleString() : '-'
    },
    { 
      field: 'duration', 
      headerName: 'Duration (hrs)', 
      width: 130,
      valueFormatter: (params) => params.value ? `${parseFloat(params.value).toFixed(1)}h` : '-'
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => getStatusChip(params.value)
    },
    { field: 'totalAmount', headerName: 'Amount (₹)', width: 120 },
    ...(user.role === 'admin' ? [
      { field: 'userName', headerName: 'User', width: 150 },
      { field: 'userEmail', headerName: 'Email', width: 200 }
    ] : []),
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        params.row.status === 'active' && (
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => handleExit(params.row.id)}
          >
            Exit
          </Button>
        )
      )
    }
  ];

  const rows = bookings.map(booking => ({
    id: booking._id,
    slotNumber: booking.parkingSlot?.slotNumber || 'N/A',
    vehicleNumber: booking.vehicleNumber,
    vehicleType: booking.vehicleType,
    entryTime: booking.entryTime,
    exitTime: booking.exitTime,
    status: booking.status,
    totalAmount: booking.totalAmount || 0,
    duration: booking.duration || 0,
    userName: booking.user?.name || 'N/A',
    userEmail: booking.user?.email || 'N/A'
  }));

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', py: 3, backgroundColor: '#f5f5f5', margin: 0, padding: 0 }}>
      <Box sx={{ width: '100%', maxWidth: '1200px', px: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        <Typography variant="h4" gutterBottom color="primary">
          {user.role === 'admin' ? 'All Bookings' : 'My Booking History'}
        </Typography>

        {message && (
          <Alert 
            severity={message.includes('successfully') ? 'success' : 'error'} 
            sx={{ mb: 2 }}
            onClose={() => setMessage('')}
          >
            {message}
          </Alert>
        )}

        <Card elevation={4}>
          <CardContent>
            {bookings.length === 0 && !loading ? (
              <Typography variant="body1" color="textSecondary" textAlign="center" py={4}>
                No bookings found. Book a parking slot to see your history here.
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {bookings.map(booking => (
                  <Grid item xs={12} key={booking._id}>
                    <Card>
                      <CardContent>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={2}>
                            <Typography variant="body2">{booking.parkingSlot?.slotNumber}</Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography variant="body2">{booking.vehicleNumber}</Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography variant="body2">{new Date(booking.entryTime).toLocaleString()}</Typography>
                          </Grid>
                          <Grid item xs={2}>
                            {getStatusChip(booking.status)}
                          </Grid>
                          <Grid item xs={2}>
                            <Typography variant="body2">₹{booking.totalAmount || 0}</Typography>
                          </Grid>
                          <Grid item xs={2}>
                            {booking.status === 'active' && (
                              <Button
                                size="small"
                                variant="contained"
                                color="secondary"
                                onClick={() => handleExit(booking._id)}
                              >
                                Exit
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>

        {/* Active Bookings Summary */}
        {user.role !== 'admin' && (
          <Box mt={3}>
            <Grid container spacing={2}>
              {bookings.filter(b => b.status === 'active').map(booking => (
                <Grid item xs={12} md={6} key={booking._id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card elevation={3} sx={{ border: '2px solid #1976d2' }}>
                      <CardContent>
                        <Typography variant="h6" color="primary" gutterBottom>
                          Active Booking
                        </Typography>
                        <Typography variant="body1">
                          <strong>Slot:</strong> {booking.parkingSlot?.slotNumber}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Vehicle:</strong> {booking.vehicleNumber}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Entry:</strong> {new Date(booking.entryTime).toLocaleString()}
                        </Typography>
                        <Box mt={2}>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleExit(booking._id)}
                          >
                            Exit Parking
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        </motion.div>
      </Box>
    </Box>
  );
};

export default BookingHistory;