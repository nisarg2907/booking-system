import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserRooms } from '../../redux/slices/user';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    dispatch(getUserRooms({ userId: userId }));
  }, [dispatch, userId]);

  const bookings = useSelector((state) => state.booking.bookings);

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
            <Card
              key={booking.room_id}
              style={{
                width: '80%',
                margin: '8px',
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px',
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={booking.room.image} // Replace with the actual image property from your Room model
                alt="Room"
                style={{ marginBottom: '8px' }}
              />
              <CardContent style={{ textAlign: 'center' }}>
                <Typography variant="h5" style={{ marginBottom: '8px' }}>
                  {booking.room.name}
                </Typography>
                <Typography variant="body1">
                  {/* Add other room details as needed */}
                </Typography>
              </CardContent>
            </Card>
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
