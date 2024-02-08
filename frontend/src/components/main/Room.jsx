import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  ImageList,
  ImageListItem,
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
} from '@mui/material';
import { format } from 'date-fns';

const Room = ({ room }) => {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [bookingConfirmationOpen, setBookingConfirmationOpen] = useState(false);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  const handleBookNow = () => {
    setBookingConfirmationOpen(true);
  };

  const confirmBooking = async () => {``
    setBookingInProgress(true);
    setBookingSuccess(false);
    setBookingError(null);

    try {
      const bookingSuccess = await submitBooking(
        room.id,
        format(selectedDateTime, 'yyyy-MM-dd HH:mm:ss')
      );
      setBookingInProgress(false);
      setBookingSuccess(bookingSuccess);
    } catch (error) {
      setBookingInProgress(false);
      setBookingError(error.message || 'An error occurred while booking.');
    }
  };

  const handleDateTimeChange = (newValue) => {
    setSelectedDateTime(newValue);
  };

  const submitBooking = async (roomId, selectedDateTime) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/booking/create',
        {
          roomId,
          date: selectedDateTime,
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
    <div>
      <Typography variant="h5">{room.roomType}</Typography>
      <ImageList cols={2} rowHeight={200}>
        {room.images.map((image, index) => (
          <ImageListItem key={index}>
            <img src={image} alt={`Room ${index}`} />
          </ImageListItem>
        ))}
      </ImageList>
      <Typography variant="subtitle1">Hotel: {room.hotelName}</Typography>
      <DatePicker
        selected={selectedDateTime}
        onChange={handleDateTimeChange}
        showTimeSelect
        dateFormat="Pp"
      />
      <Button variant="contained" color="primary" onClick={handleBookNow}>
        Book Now
      </Button>

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
    </div>
  );
};

export default Room;
