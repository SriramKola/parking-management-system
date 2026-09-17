import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { parkingAPI } from '../services/api';
import { getBackgroundStyle } from '../utils/backgroundGenerator';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await parkingAPI.getStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Slots',
      value: stats?.total || 0,
      icon: <LocalParkingIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
      filter: 'all'
    },
    {
      title: 'Available Slots',
      value: stats?.available || 0,
      icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
      color: '#4caf50',
      filter: 'available'
    },
    {
      title: 'Occupied Slots',
      value: stats?.occupied || 0,
      icon: <DirectionsCarIcon sx={{ fontSize: 40 }} />,
      color: '#ff9800',
      filter: 'occupied'
    },
    {
      title: 'Blocked Slots',
      value: stats?.blocked || 0,
      icon: <BlockIcon sx={{ fontSize: 40 }} />,
      color: '#f44336',
      filter: 'blocked'
    }
  ];

  const handleCardClick = (filter) => {
    navigate(`/parking-slots?filter=${filter}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: '100vw', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      py: 3, 
      margin: 0, 
      padding: 0,
      ...getBackgroundStyle('dashboard')
    }}>
      <Box sx={{ width: '100%', maxWidth: '1200px', px: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        <Typography variant="h4" gutterBottom color="primary">
          Dashboard
        </Typography>
        
        <Grid container spacing={3}>
          {statCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  elevation={4}
                  sx={{ 
                    height: '100%',
                    background: `linear-gradient(135deg, ${card.color}20, ${card.color}10)`,
                    border: `2px solid ${card.color}30`,
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      transition: 'transform 0.2s'
                    }
                  }}
                  onClick={() => handleCardClick(card.filter)}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="h4" fontWeight="bold" color={card.color}>
                          {card.value}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                          {card.title}
                        </Typography>
                      </Box>
                      <Box color={card.color}>
                        {card.icon}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box mt={4}>
          <Card elevation={4}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                • View available parking slots and book your spot
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                • Check your booking history and current reservations
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                • Real-time parking availability updates
              </Typography>
              
              <Box mt={3} display="flex" gap={2}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => navigate('/parking-slots')}
                >
                  View Parking Slots
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => navigate('/bookings')}
                >
                  My Bookings
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Dashboard;