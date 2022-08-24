import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import BackpackIcon from '@mui/icons-material/Backpack';
import HikingIcon from '@mui/icons-material/Hiking';
import CabinIcon from '@mui/icons-material/Cabin';
import { signOut } from 'next-auth/react';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <AppBar position="fixed" open={open} className="bg-transparent">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            
             <div className="w-20 h-20 relative rounded-full mx-4 border-2 border-cyan-800" onClick={handleDrawerOpen}>     
        <Image
          src="/images/profile.jpg"
          alt="ma tête à yellowstone" 
          layout="fill" // required
          objectFit="cover" // change to suit your needs
          className="rounded-full" // just an example
        />
      </div>
          </IconButton>
          
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <div className="w-20 h-20 relative rounded-full mx-4 border-2 border-cyan-800" onClick={handleDrawerClose}>     
        <Image
          src="/images/profile.jpg"
          alt="ma tête à yellowstone" 
          layout="fill" // required
          objectFit="cover" // change to suit your needs
          className="rounded-full" // just an example
        />
      </div>
          </IconButton>

        </DrawerHeader>
       {/* <Divider />*/}
         
         
        <List>
          {
            [
              { "key":"home", "text": "Home", "icon": <CabinIcon />, "href":"/", "onClick":"" },
              { "key":"matos", "text": "Matos", "icon": <HikingIcon />, "href":"/matos", "onClick":"" },
              { "key":"backpack", "text": "Backpack", "icon": <BackpackIcon />, "href":"/backpack", "onClick":"" },
              { "key":"logout", "text": "Log Out", "icon": <LogoutIcon />, "href":"", "onClick":signOut}
            ].map((entry) => (
            <ListItem key={entry.key} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {entry.icon}
                </ListItemIcon>
                <Link href={entry.href}>
                  <ListItemText primary={entry.text}  onClick={entry.onClick}/>
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        
      </Main>
    </Box>
  );
}
