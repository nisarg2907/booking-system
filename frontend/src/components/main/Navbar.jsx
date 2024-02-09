import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/user';

const Navbar = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutDialog, setLogoutDialog] = useState(false);

  const handleOpenLogoutDialog = () => {
    setLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    setLogoutDialog(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to the login page
    handleCloseLogoutDialog();
  };

  return (
    <>
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
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
          Welcome, {authState.user?.username}
        </Typography>
        <div style={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" onClick={handleOpenLogoutDialog}>
            Logout
          </Button>
        </div>
      </AppBar>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialog} onClose={handleCloseLogoutDialog}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
