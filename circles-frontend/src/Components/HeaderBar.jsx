import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function HeaderBar(){

    return (
        <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ width: '100%' }}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Circles
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
        </div>
    );
}
export default HeaderBar;
