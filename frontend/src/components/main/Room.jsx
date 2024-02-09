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
import { useSelector, useDispatch } from 'react-redux';
import { bookRoom } from '../../redux/slices/user';

const Room = ({ room, showButton = true }) => {
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [bookingConfirmationOpen, setBookingConfirmationOpen] = useState(false);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [invalidTimeError, setInvalidTimeError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const userId = user._id;
  const dispatch = useDispatch();
  const error = useSelector((state) => state.booking.error);

  useEffect(() => {}, [error]);

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

      dispatch(
        bookRoom({
          user_id: userId,
          room_id: room._id,
          start_time: selectedStartTime,
          end_time: selectedEndTime,
        })
      )
        .then(await new Promise((resolve) => setTimeout(resolve, 1000)))
        .finally(setBookingSuccess(true));
    } catch (error) {
      if (error.message === ' Booking slots for the rooms can not be less than 3 hours.') {
        setInvalidTimeError(error.message);
      } else if (error.message === 'Room is already booked for the selected time range') {
        setBookingError({ message: 'Room not available. Please choose a different time slot or room.' });
      } else {
        console.error('Error during booking:', error);
        setBookingError(error);
      }
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

  const getCustomErrorMessage = () => {
    if (bookingError?.message === 'Room not available. Please choose a different time slot or room.') {
      return 'Room already booked. Please choose a different time slot or room.';
    } else {
      return 'Rooms have to be booked for atleast 3 hours.';
    }
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
              <DatePicker selected={selectedStartTime} onChange={handleStartTimeChange} showTimeSelect dateFormat="Pp" style={{ width: '100%' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle1" style={{ marginBottom: '6px' }}>
                End Time:
              </Typography>
              <DatePicker selected={selectedEndTime} onChange={handleEndTimeChange} showTimeSelect dateFormat="Pp" style={{ width: '100%' }} />
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
          <DialogContentText>Are you sure you want to book this room?</DialogContentText>
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
            {getCustomErrorMessage()}
          </Alert>
        )}
      </Snackbar>
    </Card>
  );
};

export default Room;
