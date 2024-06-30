import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from '@mui/material';
import { avatar } from '..';
import '../styles/components.css';

export default function ButtonAppBar() {
  return (

<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className='button-app-bar'>
        <Toolbar variant='dense'>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Groceteria
          </Typography>
          <Button color="inherit">Login <Avatar alt="Remy Sharp" src={avatar} style={{marginLeft:5}} /></Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}