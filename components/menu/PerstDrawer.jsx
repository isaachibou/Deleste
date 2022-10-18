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
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import HikingIcon from '@mui/icons-material/Hiking';
import CabinIcon from '@mui/icons-material/Cabin';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ApiOutlinedIcon from '@mui/icons-material/ApiOutlined';
import { signOut, useSession, getSession } from 'next-auth/react';


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
  const { data: session, status } = useSession()
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ position: 'absolute', left: "1%", top: "2rem", "z-index":"30" }} >
      <CssBaseline />
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon className=""/>
        </IconButton>
        <Drawer className="bg-transparent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              'background-color': 'transparent',
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} className="mt-8">
             <MenuIcon className="hover:"/>
          </IconButton>
        </DrawerHeader>
        <List>
          {
            [
              { "key":"home", "text": "Home", "icon": <CabinIcon style={{ color: "#28384f" }}/>, "href":"/", "onClick":"" },
              { "key":"profile", "text": "Profile", "icon": <Person2OutlinedIcon style={{ color: "#28384f" }}/>, "href":"/profile", "onClick":"" },
              { "key":"matos", "text": "Matos", "icon": <HikingIcon style={{ color: "#28384f" }} />, "href":"/matos", "onClick":"" },
              { "key":"backpack", "text": "Backpack", "icon": <BackpackIcon style={{ color: "#28384f" }} />, "href":"/backpack", "onClick":"" },
              { "key":"sandbag", "text": "Sandbag", "icon": <ConstructionOutlinedIcon style={{ color: "#28384f" }}/>, "href":"/sandbag", "onClick":"" },
              { "key":"logout", "text": "Log Out", "icon": <LogoutIcon style={{ color: "#28384f" }} />, "href":"", "onClick":signOut}
            ].map((entry) => (
            <ListItem key={entry.key} disablePadding>
              <ListItemButton disablePadding>
                <ListItemIcon className="md:min-w-[35px]" disablePadding>
                  {entry.icon}
                </ListItemIcon>
                <Link href={entry.href} >
                  <ListItemText className="text-pata-400" classes={{primary:"leading-3"}} primary={entry.text}  onClick={entry.onClick}/>
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {session && (session.user.role === "admin" && (
            <List>
              <h2 className=" italic text-center text-pata-400"> Administrator Content </h2>
              <p className="mb-2 text-center text-xs text-pata-400">Logged in as {session.user.role}</p>

            {
              [
                { "key":"users", "text": "Users", "icon": <PersonOutlineOutlinedIcon style={{ color: "#28384f" }}/>, "href":"/userlist", "onClick":"" },
                { "key":"data", "text": "Data", "icon": <StorageOutlinedIcon style={{ color: "#28384f" }}/>, "href":"/data", "onClick":"" },
                { "key":"api", "text": "Items API", "icon": < ApiOutlinedIcon style={{ color: "#28384f" }}/>, "href":"/api/allitems", "onClick":"" },
              ].map((entry) => (
              <ListItem key={entry.key} disablePadding>
                <ListItemButton disablePadding>
                  <ListItemIcon className="md:min-w-[35px]" disablePadding>
                    {entry.icon}
                  </ListItemIcon>
                  <Link href={entry.href} >
                    <ListItemText classes={{primary:"leading-3"}} className="text-pata-400" primary={entry.text}  onClick={entry.onClick}/>
                  </Link>
                </ListItemButton>
              </ListItem>
            ))}
            </List>
           ))}
        <Divider />
        {session && (
        <p className="mt-2 text-center text-xs text-pata-400">Logged in as {session.user.email} {session.user.role}</p>
      )}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        
      </Main>
    </Box>
  );
}
