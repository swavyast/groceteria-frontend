import * as React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutButton from './LogoutButton';
import { AllInbox, AutoDelete, DraftsRounded, Logout, SendRounded, StarRounded, WarningAmber } from '@mui/icons-material';
import Copyright from './Copyright';

export default function TemporaryDrawer({ openDrawer, setOpenDrawer }) {

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <InboxIcon /> : index === 1? <StarRounded /> : index === 2 ? <SendRounded /> : <DraftsRounded />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <AllInbox /> : index === 1 ? <AutoDelete /> : <WarningAmber />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        {(localStorage.getItem('jwtToken')!== null) &&
          <List>
            <ListItem>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <LogoutButton />
            </ListItem>
          </List>}
        <div className='my-2'>
        {DrawerList}
        </div>
        <Copyright sx={{ mt: 5 }}  />
      </Drawer>
    </div>
  );
}
