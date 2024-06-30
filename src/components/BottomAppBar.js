import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import TemporaryDrawer from './Drawer';
import Copyright from './Copyright';

export default function BottomAppBar() {

    const [openDrawer, setOpenDrawer] = React.useState(false);
    const handleMoreIcon = ()=>{
        setOpenDrawer(!openDrawer);
    }
    return (
        <React.Fragment>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar sx={{backgroundColor:'GrayText'}}>
                    <Copyright  sx={{ mt: 0, color:'inherit' }} />
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="inherit" onClick={handleMoreIcon}>
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <TemporaryDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        </React.Fragment>
    );
}