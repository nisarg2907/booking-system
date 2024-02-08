import React from 'react';
import AppBar from '@mui/material/AppBar';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
    
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#e5e5e5',
        color: '#333',
        boxShadow: 'none',
        width: '100%',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
     
        <div>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
            Welcome, {user}
          </Typography>
        </div>
     
      <div style={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
      <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Logout
        </Button>
       
      </div>
     
    </AppBar>
  );
};

export default Navbar;
