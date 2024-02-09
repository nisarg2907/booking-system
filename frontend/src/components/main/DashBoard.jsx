import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserRooms } from '../../redux/slices/user';
import {
  Container,
  Typography,
  Button
} from '@mui/material';
import Room from './Room';

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user._id);
  const bookings = useSelector((state) => state.booking.bookings);

  useEffect(() => {
    dispatch(getUserRooms({ userId: userId }));
  }, [dispatch, userId,bookings]);



  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#e1f5fe',
        padding: '16px',
        height: '100vh', // Set height to 100vh
        width: '100vw', // Set width to 100vw
      }}
    >
    

      {bookings && bookings.length > 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Typography variant="h2" style={{ marginBottom: '16px' }}>
        Your Bookings
      </Typography>
          {bookings.map((booking) => (
            <Room room={booking} showButton={false}  />
          ))}
        </div>
      ) : (
        <Typography variant="h5" style={{ marginBottom: '16px' }}>
          You don't have any current bookings.
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        style={{
          marginTop: '16px',
        }}
        onClick={() => navigate('/home')}
      >
        Explore All Rooms
      </Button>
    </Container>
  );
};

export default DashBoard;
