import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import FormDialog from './LoginForm';
import TemporaryDrawer from './Drawer';
import { logout } from '../services/LogoutService';
import { AppRegistrationOutlined, Login, Logout, ModeEdit, Settings } from '@mui/icons-material';
import { Avatar, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, Paper } from '@mui/material';
import { List } from '@mui/material';
import { useAuthContext, useTokenContext } from '../AppContext';

const avatar = '../static/images/avatar/1.jpg';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const { isAuthenticated } = useAuthContext();
  const { token } = useTokenContext();

  const [open, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerOpenClose = () => {
    setOpenDrawer(!openDrawer);
  }
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleOnLoginClick = () => {
    setOpen(true);
    handleMenuClose();
  }

  const handleOnLogoutClick = () => {
    logout();
    handleMenuClose();
  }
  const handleOnRegistrationClick = () => {

  }

  const handleOnMyAccountClick = () => {

  }

  const handleOnSettingsClick = () => { }

  const handleOnEditProfileClick = () => { }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    (!isAuthenticated) ?
      <Menu
        sx={{ mt: 5 }}
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
        <MenuItem sx={{ gap: 1 }} onClick={handleOnLoginClick}>
          <Login />
          Login</MenuItem>
        <MenuItem sx={{ gap: 1 }} onClick={handleOnRegistrationClick}>
          <AppRegistrationOutlined />
          Register</MenuItem>
      </Menu>
      :
      <Menu
        sx={{ mt: 5 }}
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
        <MenuItem sx={{ gap: 1 }} onClick={handleOnMyAccountClick}><AccountCircle />My Account</MenuItem>
        <MenuItem sx={{ gap: 1 }} onClick={handleOnSettingsClick}><Settings /> Settings</MenuItem>
        <MenuItem sx={{ gap: 1 }} onClick={handleOnEditProfileClick}><ModeEdit /> Edit Profile</MenuItem>
        <MenuItem sx={{ gap: 1 }} onClick={handleOnLogoutClick}><Logout />Logout</MenuItem>
      </Menu>
  );

  const messages = [
    {
      id: 1,
      primary: 'Brunch this week?',
      secondary: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
      person: '/static/images/avatar/5.jpg',
    },
    {
      id: 2,
      primary: 'Birthday Gift',
      secondary: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      person: '/static/images/avatar/1.jpg',
    },
    {
      id: 3,
      primary: 'Recipe to try',
      secondary: 'I am try out this new BBQ recipe, I think this might be amazing',
      person: '/static/images/avatar/2.jpg',
    },
    {
      id: 4,
      primary: 'Yes!',
      secondary: 'I have the tickets to the ReactConf for this year.',
      person: '/static/images/avatar/3.jpg',
    },
    {
      id: 5,
      primary: "Doctor's Appointment",
      secondary: 'My appointment for the doctor was rescheduled for next Saturday.',
      person: '/static/images/avatar/4.jpg',
    },
    {
      id: 6,
      primary: 'Discussion',
      secondary: `Menus that are generated by the bottom app bar (such as a bottom
        navigation drawer or overflow menu) open as bottom sheets at a higher elevation
        than the bar.`,
      person: '/static/images/avatar/5.jpg',
    },
    {
      id: 7,
      primary: 'Summer BBQ',
      secondary: `Who wants to have a cookout this weekend? I just got some furniture
        for my backyard and would love to fire up the grill.`,
      person: '/static/images/avatar/1.jpg',
    },
  ];

  const renderMessageId = 'render-all-messages';
  const renderMessages = (
    <Menu
      sx={{ mt: 5 }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={renderMessageId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="render-all-messages"
          aria-haspopup="true"
          color="inherit"
        >
          <Paper square sx={{ pb: '50px' }}>
            <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
              Inbox
            </Typography>
            <List sx={{ mb: 2 }}>
              {messages.map(({ id, primary, secondary, person }) => (
                <React.Fragment key={id}>
                  {id === 1 && (
                    <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                      Today
                    </ListSubheader>
                  )}

                  {id === 3 && (
                    <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                      Yesterday
                    </ListSubheader>
                  )}

                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" src={person} />
                    </ListItemAvatar>
                    <ListItemText primary={primary} secondary={secondary} />
                  </ListItemButton>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon onClick={handleProfileMenuOpen} />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {(token === null) ? <AccountCircle /> : <Avatar src={avatar} />}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: 'GrayText' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={handleDrawerOpenClose} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Groceteria
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {
              (token !== null) &&
              <>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </>
            }
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderMessages}
      <FormDialog open={open} setOpen={setOpen} />
      <TemporaryDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </Box>
  );
}
