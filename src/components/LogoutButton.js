import React from 'react';
import { Button } from '@mui/material';
import { logout } from '../services/LogoutService';

const LogoutButton = () => {
  const handleLogout = () => {
    logout();
  };

  return (
    <Button onClick={handleLogout}>Logout</Button>
  );
};

export default LogoutButton;