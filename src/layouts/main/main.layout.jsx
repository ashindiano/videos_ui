import Box from '@mui/material/Box';
import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuAppBar from './appbar';

const menuItems = [
  { title: 'Videos', path: '/videos' },
  { title: 'Upload', path: '/videos/upload' },
];

const MainLayout = function () {
  return (
    <Box
      sx={{
        display: 'block',
        padding: '0',
        height: '100vh',
        width: '100vw',
      }}
    >
      <MenuAppBar menu={menuItems} />
      <Box sx={{ height: 'calc(100vh - 56px)', width: 'inherit' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
