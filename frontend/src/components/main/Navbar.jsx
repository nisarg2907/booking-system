import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/user';

const Navbar = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(authState);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/login'); // Redirect to the login page
  };

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
          Welcome, {authState.user?.username}
        </Typography>
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </AppBar>
  );
};

export default Navbar;
