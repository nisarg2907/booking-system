import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { getUserRooms } from '../../redux/slices/user';
import { Container, Typography, Button, Paper } from '@mui/material';
import Room from './Room';

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user._id);

  const bookings = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(getUserRooms({ userId: userId }));
  }, []);

  const userBooking = bookings.bookings;
  console.log(userBooking);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy h:mm a');
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#e1f5fe',
        overflow: 'auto',
        padding: '16px',
        minHeight: '100vh', 
        minWidth: '100vw',
      }}
    >
      {userBooking && userBooking.length > 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h2" style={{ marginBottom: '16px', color: '#000000' }}>
            Your Bookings
          </Typography>
          {userBooking.map((booking) => (
            <React.Fragment key={booking._id}>
              <Paper
                elevation={3}
                style={{
                  marginBottom: '16px',
                  width: '80%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px',
                }}
              >
                <Room room={booking} showButton={false} />
                <Typography variant="h6" style={{ color: '#000000' }}>
                  From: {formatDate(booking.start_time)}
                </Typography>
                <Typography variant="h6" style={{ color: '#000000' }}>
                  To: {formatDate(booking.end_time)}
                </Typography>
              </Paper>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <Typography variant="h5" style={{ marginBottom: '16px', color: '#000000' }}>
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
