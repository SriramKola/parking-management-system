# Smart Parking Management System

A comprehensive MERN Stack application for managing parking slots with real-time availability tracking, user authentication, and admin controls.

## Features

### User Features
- **User Registration & Login**: Secure authentication with JWT tokens
- **Real-time Parking Availability**: View available, occupied, and blocked slots
- **Visual Slot Booking**: BookMyShow-style slot selection interface
- **Booking Management**: Track current and historical bookings
- **Automatic Exit**: Easy vehicle exit with automatic billing

### Admin Features
- **Admin Dashboard**: Complete parking statistics overview
- **Slot Management**: Create, update, delete, and block/unblock parking slots
- **Booking Monitoring**: View all user bookings and manage exits
- **Real-time Updates**: Live parking status updates

## Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database with Mongoose ODM
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing

### Frontend
- **React**: UI library with hooks
- **Material-UI**: Component library and styling
- **React Router**: Navigation
- **Axios**: HTTP client
- **Framer Motion**: Animations

## Project Structure

### Backend Structure
```
backend/
├── package.json
├── server.js
├── .env
└── src/
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   ├── parkingController.js
    │   └── bookingController.js
    ├── middleware/
    │   └── auth.js
    ├── models/
    │   ├── User.js
    │   ├── ParkingSlot.js
    │   └── Booking.js
    └── routes/
        ├── authRoutes.js
        ├── parkingRoutes.js
        └── bookingRoutes.js
```

### Frontend Structure
```
frontend/
├── package.json
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── components/
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ParkingSlots.jsx
│   │   ├── BookingHistory.jsx
│   │   └── AdminDashboard.jsx
│   └── services/
│       └── api.js
└── vite.config.js
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/parking_management
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Parking Management
- `GET /api/parking/slots` - Get all parking slots
- `GET /api/parking/stats` - Get parking statistics
- `POST /api/parking/slots` - Create new slot (Admin only)
- `PUT /api/parking/slots/:id` - Update slot (Admin only)
- `DELETE /api/parking/slots/:id` - Delete slot (Admin only)

### Booking Management
- `POST /api/booking` - Create new booking
- `GET /api/booking/my-bookings` - Get user bookings
- `GET /api/booking/all` - Get all bookings (Admin only)
- `PUT /api/booking/exit/:bookingId` - Exit parking

## Usage

### For Users
1. Register/Login to the system
2. View available parking slots on the dashboard
3. Click on available slots to book them
4. Provide vehicle details and confirm booking
5. Use "Exit Parking" when leaving

### For Admins
1. Register/Login with admin role
2. Access admin dashboard for slot management
3. Create, edit, or delete parking slots
4. Block/unblock slots as needed
5. Monitor all user bookings

## Features Highlights

- **Responsive Design**: Works on all device sizes
- **Real-time Updates**: Live parking availability
- **Secure Authentication**: JWT-based auth system
- **Visual Slot Selection**: Intuitive booking interface
- **Comprehensive Admin Panel**: Full parking management
- **Animated UI**: Smooth transitions and interactions

## Future Enhancements

- Payment integration
- Mobile app development
- QR code-based entry/exit
- Automated parking detection
- Email notifications
- Advanced reporting and analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.