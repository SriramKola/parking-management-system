import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { parkingAPI } from '../services/api';

const AdminDashboard = () => {
  const [slots, setSlots] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [dialog, setDialog] = useState({ open: false, mode: 'create', slot: null });
  const [bulkDialog, setBulkDialog] = useState(false);
  const [formData, setFormData] = useState({
    slotNumber: '',
    type: 'standard',
    floor: 1,
    section: 'A'
  });
  const [bulkData, setBulkData] = useState({
    prefix: 'A',
    startNumber: 1,
    endNumber: 10,
    type: 'standard',
    floor: 1,
    section: 'A'
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [slotsResponse, statsResponse] = await Promise.all([
        parkingAPI.getAllSlots(),
        parkingAPI.getStats()
      ]);
      
      setSlots(slotsResponse.data.slots);
      setStats(statsResponse.data.stats);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSlot = () => {
    setFormData({ slotNumber: '', type: 'standard', floor: 1, section: 'A' });
    setDialog({ open: true, mode: 'create', slot: null });
  };

  const handleBulkCreate = () => {
    setBulkData({ prefix: 'A', startNumber: 1, endNumber: 10, type: 'standard', floor: 1, section: 'A' });
    setBulkDialog(true);
  };

  const handleBulkSubmit = async () => {
    try {
      const response = await parkingAPI.createBulkSlots(bulkData);
      setMessage(`Created ${response.data.created} slots successfully! ${response.data.skipped > 0 ? `Skipped ${response.data.skipped} existing slots.` : ''}`);
      setBulkDialog(false);
      fetchData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Bulk creation failed');
    }
  };

  const handleEditSlot = (slot) => {
    setFormData({
      slotNumber: slot.slotNumber,
      type: slot.type,
      floor: slot.floor,
      section: slot.section
    });
    setDialog({ open: true, mode: 'edit', slot });
  };

  const handleSubmit = async () => {
    try {
      if (dialog.mode === 'create') {
        await parkingAPI.createSlot(formData);
        setMessage('Slot created successfully!');
      } else {
        await parkingAPI.updateSlot(dialog.slot._id, formData);
        setMessage('Slot updated successfully!');
      }
      
      setDialog({ open: false, mode: 'create', slot: null });
      fetchData();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleToggleStatus = async (slot) => {
    try {
      const newStatus = slot.status === 'blocked' ? 'available' : 'blocked';
      await parkingAPI.updateSlot(slot._id, { status: newStatus });
      setMessage(`Slot ${newStatus === 'blocked' ? 'blocked' : 'unblocked'} successfully!`);
      fetchData();
    } catch (error) {
      setMessage('Status update failed');
    }
  };

  const handleDeleteSlot = async (slotId) => {
    if (window.confirm('Are you sure you want to delete this slot?')) {
      try {
        await parkingAPI.deleteSlot(slotId);
        setMessage('Slot deleted successfully!');
        fetchData();
      } catch (error) {
        setMessage('Delete failed');
      }
    }
  };

  const statCards = [
    { title: 'Total Slots', value: stats?.total || 0, color: '#1976d2', filter: 'all' },
    { title: 'Available', value: stats?.available || 0, color: '#4caf50', filter: 'available' },
    { title: 'Occupied', value: stats?.occupied || 0, color: '#ff9800', filter: 'occupied' },
    { title: 'Blocked', value: stats?.blocked || 0, color: '#f44336', filter: 'blocked' }
  ];

  const handleCardClick = (filter) => {
    navigate(`/parking-slots?filter=${filter}`);
  };

  const columns = [
    { field: 'slotNumber', headerName: 'Slot Number', width: 120 },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'floor', headerName: 'Floor', width: 100 },
    { field: 'section', headerName: 'Section', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEditSlot(params.row)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton 
            onClick={() => handleToggleStatus(params.row)}
            color={params.row.status === 'blocked' ? 'success' : 'warning'}
          >
            {params.row.status === 'blocked' ? <CheckCircleIcon /> : <BlockIcon />}
          </IconButton>
          <IconButton onClick={() => handleDeleteSlot(params.row.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  const rows = slots.map(slot => ({
    id: slot._id,
    slotNumber: slot.slotNumber,
    type: slot.type,
    status: slot.status,
    floor: slot.floor,
    section: slot.section,
    ...slot
  }));

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', py: 3, backgroundColor: '#f5f5f5', margin: 0, padding: 0 }}>
      <Box sx={{ width: '100%', maxWidth: '1200px', px: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" color="primary">
            Admin Dashboard
          </Typography>
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              onClick={handleBulkCreate}
            >
              Bulk Create Slots
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateSlot}
            >
              Add Single Slot
            </Button>
          </Box>
        </Box>

        {message && (
          <Alert 
            severity={message.includes('successfully') ? 'success' : 'error'} 
            sx={{ mb: 2 }}
            onClose={() => setMessage('')}
          >
            {message}
          </Alert>
        )}

        {/* Statistics Cards */}
        <Grid container spacing={3} mb={4}>
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
                    background: `linear-gradient(135deg, ${card.color}20, ${card.color}10)`,
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      transition: 'transform 0.2s'
                    }
                  }}
                  onClick={() => handleCardClick(card.filter)}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" color={card.color}>
                      {card.value}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {card.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Slots Management Table */}
        <Card elevation={4}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Manage Parking Slots
            </Typography>
            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                loading={loading}
                disableSelectionOnClick
              />
            </Box>
          </CardContent>
        </Card>

        {/* Bulk Create Dialog */}
        <Dialog open={bulkDialog} onClose={() => setBulkDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Bulk Create Slots</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Prefix (e.g., A, B, VIP)"
              value={bulkData.prefix}
              onChange={(e) => setBulkData({...bulkData, prefix: e.target.value})}
              margin="normal"
              required
            />
            
            <Box display="flex" gap={2}>
              <TextField
                label="Start Number"
                type="number"
                value={bulkData.startNumber}
                onChange={(e) => setBulkData({...bulkData, startNumber: parseInt(e.target.value)})}
                margin="normal"
                required
              />
              <TextField
                label="End Number"
                type="number"
                value={bulkData.endNumber}
                onChange={(e) => setBulkData({...bulkData, endNumber: parseInt(e.target.value)})}
                margin="normal"
                required
              />
            </Box>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select
                value={bulkData.type}
                onChange={(e) => setBulkData({...bulkData, type: e.target.value})}
                label="Type"
              >
                <MenuItem value="standard">Standard</MenuItem>
                <MenuItem value="disabled">Disabled</MenuItem>
                <MenuItem value="vip">VIP</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="Floor"
              type="number"
              value={bulkData.floor}
              onChange={(e) => setBulkData({...bulkData, floor: parseInt(e.target.value)})}
              margin="normal"
              required
            />
            
            <TextField
              fullWidth
              label="Section"
              value={bulkData.section}
              onChange={(e) => setBulkData({...bulkData, section: e.target.value})}
              margin="normal"
              required
            />
            
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              This will create slots: {bulkData.prefix}{bulkData.startNumber.toString().padStart(2, '0')} to {bulkData.prefix}{bulkData.endNumber.toString().padStart(2, '0')}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setBulkDialog(false)}>Cancel</Button>
            <Button onClick={handleBulkSubmit} variant="contained">
              Create {bulkData.endNumber - bulkData.startNumber + 1} Slots
            </Button>
          </DialogActions>
        </Dialog>

        {/* Create/Edit Dialog */}
        <Dialog open={dialog.open} onClose={() => setDialog({ open: false, mode: 'create', slot: null })} maxWidth="sm" fullWidth>
          <DialogTitle>
            {dialog.mode === 'create' ? 'Create New Slot' : 'Edit Slot'}
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Slot Number"
              value={formData.slotNumber}
              onChange={(e) => setFormData({...formData, slotNumber: e.target.value})}
              margin="normal"
              required
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                label="Type"
              >
                <MenuItem value="standard">Standard</MenuItem>
                <MenuItem value="disabled">Disabled</MenuItem>
                <MenuItem value="vip">VIP</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="Floor"
              type="number"
              value={formData.floor}
              onChange={(e) => setFormData({...formData, floor: parseInt(e.target.value)})}
              margin="normal"
              required
            />
            
            <TextField
              fullWidth
              label="Section"
              value={formData.section}
              onChange={(e) => setFormData({...formData, section: e.target.value})}
              margin="normal"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialog({ open: false, mode: 'create', slot: null })}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained">
              {dialog.mode === 'create' ? 'Create' : 'Update'}
            </Button>
          </DialogActions>
        </Dialog>
        </motion.div>
      </Box>
    </Box>
  );
};

export default AdminDashboard;