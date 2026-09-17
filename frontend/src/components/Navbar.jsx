import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <DirectionsCarIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Smart Parking System
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
          <Button color="inherit" onClick={() => navigate('/parking-slots')}>
            Parking Slots
          </Button>
          <Button color="inherit" onClick={() => navigate('/bookings')}>
            {user?.role === 'admin' ? 'All Bookings' : 'My Bookings'}
          </Button>
          

          
          <Typography variant="body1" sx={{ alignSelf: 'center', mx: 2 }}>
            Welcome, {user?.name} ({user?.role})
          </Typography>
          
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;