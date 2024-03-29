import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from './Room';
import {  Typography, Container } from '@mui/material';

const RoomList = () => {
  const [roomList, setRoomList] = useState([]);


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

 

  return (
    <Container maxWidth="md" style={{ marginTop: '32px', marginBottom: '32px' }}>
      <Typography variant="h4" style={{ marginBottom: '16px', textAlign: 'center' }}>
        Available Rooms
      </Typography>
      <div style={{ display: 'flex',  flexDirection: 'column',justifyContent: 'center' }}>
        {roomList.map((room) => (
          <Room key={room.id} room={room}  />
        ))}
      </div>
    </Container>
  );
};

export default RoomList;
