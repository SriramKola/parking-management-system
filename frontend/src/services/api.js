import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://parking-management-system-4wfm.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Parking API
export const parkingAPI = {
  getAllSlots: () => api.get('/parking/slots'),
  getStats: () => api.get('/parking/stats'),
  createSlot: (data) => api.post('/parking/slots', data),
  createBulkSlots: (data) => api.post('/parking/slots/bulk', data),
  updateSlot: (id, data) => api.put(`/parking/slots/${id}`, data),
  deleteSlot: (id) => api.delete(`/parking/slots/${id}`),
};

// Booking API
export const bookingAPI = {
  createBooking: (data) => api.post('/booking', data),
  getUserBookings: () => api.get('/booking/my-bookings'),
  getAllBookings: () => api.get('/booking/all'),
  exitParking: (bookingId) => api.put(`/booking/exit/${bookingId}`),
};

export default api;