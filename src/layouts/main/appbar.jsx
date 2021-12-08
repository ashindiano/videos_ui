import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { MenuList } from '@mui/material';
import PropTypes from 'prop-types';

const PrimarySearchAppBar = function (props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (menu) => (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuList dense>
        {menu.map(({ path, title }) => (
          <MenuItem
            key={path}
            dense
            onClick={() => {
              window.location.href = path;
              handleMenuClose();
            }}
          >
            {title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );

  const { menu } = props;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={handleProfileMenuOpen}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex' }}>
            <AccountCircle />
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu(menu)}
    </Box>
  );
};

PrimarySearchAppBar.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
};
PrimarySearchAppBar.defaultProps = {
  menu: [],
};

export default PrimarySearchAppBar;
