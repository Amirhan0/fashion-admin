import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#283593', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton color="inherit" edge="start">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Админ панель
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
