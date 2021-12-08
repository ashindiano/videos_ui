import Box from '@mui/material/Box';
import React from 'react';
import { Outlet } from 'react-router-dom';

const PlainLayout = function () {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        color: 'error.main',
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Outlet />
    </Box>
  );
};

export default PlainLayout;
