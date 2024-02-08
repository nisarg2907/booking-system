import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from './Room';
import { Snackbar, Alert, Typography, Container } from '@mui/material';

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
    <Container maxWidth="md" style={{ marginTop: '32px', marginBottom: '32px' }}>
      <Typography variant="h4" style={{ marginBottom: '16px', textAlign: 'center' }}>
        Available Rooms
      </Typography>
      <div style={{ display: 'flex',  flexDirection: 'column',justifyContent: 'center' }}>
        {roomList.map((room) => (
          <Room key={room.id} room={room} setBookingSuccess={setBookingSuccess} setBookingError={setBookingError} />
        ))}
      </div>

      <Snackbar open={bookingSuccess || !!bookingError} autoHideDuration={6000} onClose={handleCloseSnackbar}>
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
    </Container>
  );
};

export default RoomList;
