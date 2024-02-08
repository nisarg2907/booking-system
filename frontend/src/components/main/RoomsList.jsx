import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from './Room'; // Import the reusable Room component
import { Snackbar, Alert, CircularProgress } from '@mui/material';

const RoomList = () => {
  const [roomList, setRoomList] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/room/all-rooms');
        setRoomList(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleCloseSnackbar = () => {
    setBookingSuccess(false);
    setBookingError(null);
  };

  return (
    <div>
      {roomList.map((room) => (
        <Room key={room.id} room={room} setBookingSuccess={setBookingSuccess} setBookingError={setBookingError} />
      ))}

      <Snackbar
        open={bookingSuccess || !!bookingError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        {bookingSuccess ? (
          <Alert onClose={handleCloseSnackbar} severity="success">
            Booking successful!
          </Alert>
        ) : (
          <Alert onClose={handleCloseSnackbar} severity="error">
            {bookingError || 'An error occurred while booking.'}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default RoomList;
