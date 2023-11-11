import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function HeaderBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

 // console.log(localStorage.getItem('token'))
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigateToProfile = () => {
    navigate('/profile'); 
    handleMenuClose();
  };

  const navigateToProjects = () => {
    navigate('/mainpage'); 
    handleMenuClose();
  };
  const navigateToMessages = () => {
    navigate('/messages'); 
    handleMenuClose();
  };

  const navigateToLogin = () => {
    navigate('/'); 
    localStorage.clear()
    handleMenuClose();
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ width: '100%' }}>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Circles
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={navigateToProfile}>My Profile</MenuItem>
        <MenuItem onClick={navigateToProjects}>My Projects</MenuItem>
        <MenuItem onClick={navigateToMessages}>My Messages</MenuItem>
        <MenuItem onClick={navigateToLogin}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default HeaderBar;
