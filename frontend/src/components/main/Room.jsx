import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import { useSelector } from 'react-redux';

const Room = ({ room, showButton = true }) => {
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [bookingConfirmationOpen, setBookingConfirmationOpen] = useState(false);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [invalidTimeError, setInvalidTimeError] = useState(null);
const userId = useSelector((state)=>state.auth.user._id);
  const handleBookNow = () => {
    setInvalidTimeError(null);
    setBookingConfirmationOpen(true);
  };

  const confirmBooking = async () => {
    setBookingInProgress(true);
    setBookingSuccess(false);
    setBookingError(null);

    try {
      // Validate start time and end time
      if (selectedStartTime >= selectedEndTime || selectedEndTime - selectedStartTime < 3 * 60 * 60 * 1000) {
        throw new Error(' Booking slots for the rooms can not be less than 3 hours.');
      }

      // Make the API call
      console.log("booking req reached");
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3001/api/room/book-room",
        { user_id: userId, room_id: room._id, start_time: selectedStartTime, end_time: selectedEndTime },
        { headers: { Authorization: token } }
      );

      console.log("booking req done");
      console.log(response);

      // Handle success
      setBookingSuccess(true);
    } catch (error) {
      // Handle errors
      console.log(error.message, "Booking failed Room is already booked");
      setBookingError( 'This Room is already Booked ,please select different room or date.');
    } finally {
      setBookingInProgress(false);
      setBookingConfirmationOpen(false);
    }
  };

  const handleStartTimeChange = (newValue) => {
    setSelectedStartTime(newValue);
  };

  const handleEndTimeChange = (newValue) => {
    setSelectedEndTime(newValue);
  };

  const handleCloseSnackbar = () => {
    setBookingSuccess(false);
    setBookingError(null);
    setInvalidTimeError(null);
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
        {showButton && (
          <div>
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
          </div>
        )}
      </CardContent>
      <CardActions style={{ justifyContent: 'flex-end' }}>
        {showButton && (
          <Button variant="contained" color="primary" onClick={handleBookNow}>
            Book Now
          </Button>
        )}
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

      <Snackbar open={bookingSuccess || !!bookingError || !!invalidTimeError} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        {bookingSuccess ? (
          <Alert onClose={handleCloseSnackbar} severity="success">
            Booking successful!
          </Alert>
        ) : (
          <Alert onClose={handleCloseSnackbar} severity="error">
            {bookingError || invalidTimeError || 'An error occurred while booking.'}
          </Alert>
        )}
      </Snackbar>
    </Card>
  );
};

export default Room;
