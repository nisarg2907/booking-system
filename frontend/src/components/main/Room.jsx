import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Button,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from '@mui/material';
import { format } from 'date-fns';

const Room = ({ room,showButton = true }) => {
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [bookingConfirmationOpen, setBookingConfirmationOpen] = useState(false);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  const handleBookNow = () => {
    setBookingConfirmationOpen(true);
  };

  const confirmBooking = async () => {
    setBookingInProgress(true);
    setBookingSuccess(false);
    setBookingError(null);

    try {
      const bookingSuccess = await submitBooking(
        room.id,
        format(selectedStartTime, 'yyyy-MM-dd HH:mm:ss'),
        format(selectedEndTime, 'yyyy-MM-dd HH:mm:ss')
      );
      setBookingInProgress(false);
      setBookingSuccess(bookingSuccess);
    } catch (error) {
      setBookingInProgress(false);
      setBookingError(error.message || 'An error occurred while booking.');
    }
  };

  const handleStartTimeChange = (newValue) => {
    setSelectedStartTime(newValue);
  };

  const handleEndTimeChange = (newValue) => {
    setSelectedEndTime(newValue);
  };

  const submitBooking = async (roomId, startDateTime, endDateTime) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/booking/create',
        {
          roomId,
          startTime: startDateTime,
          endTime: endDateTime,
        }
      );
      return true;
    } catch (error) {
      console.error('Error creating booking:', error);
      return false;
    }
  };

  const handleCloseSnackbar = () => {
    setBookingSuccess(false);
    setBookingError(null);
  };

  return (
    <Card style={{ marginBottom: '20px', width: '80%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f5f5f5', color: '#333' }}>
      <CardMedia
        component="img"
        height="200"
        image={process.env.PUBLIC_URL + '/img.jpg'}
        alt="Room"
        style={{ borderRadius: '8px 8px 0 0' }}
      />
      <CardContent>
        <Typography variant="h6" style={{ marginBottom: '12px' }}>
          {room.room_type} , Room for {room.capacity} People
        </Typography>
        <Typography variant="subtitle1" style={{ marginBottom: '12px' }}>
          Hotel: {room.hotel_name}
        </Typography>
        <Typography variant="subtitle1" style={{ marginBottom: '12px' }}>
          Location: {room.location}
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '12px' }}>
          <Typography variant="subtitle1" style={{ marginBottom: '6px' }}>
            Start Time:
          </Typography>
          <DatePicker
            selected={selectedStartTime}
            onChange={handleStartTimeChange}
            showTimeSelect
            dateFormat="Pp"
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle1" style={{ marginBottom: '6px' }}>
            End Time:
          </Typography>
          <DatePicker
            selected={selectedEndTime}
            onChange={handleEndTimeChange}
            showTimeSelect
            dateFormat="Pp"
            style={{ width: '100%' }}
          />
        </div>
      </CardContent>
      <CardActions style={{ justifyContent: 'flex-end' }}>
       {showButton &&  <Button variant="contained" color="primary" onClick={handleBookNow}>
          Book Now
        </Button>}
      </CardActions>

      <Dialog open={bookingConfirmationOpen} onClose={() => setBookingConfirmationOpen(false)}>
        <DialogTitle>Confirm Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to book this room?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBookingConfirmationOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmBooking} color="primary" disabled={bookingInProgress}>
            {bookingInProgress ? <CircularProgress color="inherit" size={20} /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>

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
    </Card>
  );
};

export default Room;
