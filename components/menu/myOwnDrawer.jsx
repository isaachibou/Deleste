import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from '@mui/icons-material/Menu';
import styled from "styled-components";

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    position: "absolute",
    overflowX: "hidden",
    zIndex: theme.zIndex.drawer + 2,
    [theme.breakpoints.up("sm")]: {
      position: "relative",
      width: drawerWidth,
      flexShrink: 0,
      zIndex: theme.zIndex.drawer
    },
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: 0,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  }
});

const StyledDrawer = styled(Drawer)`
  ${({ theme, open }) => {
    const classes = styles(theme);
    return {
      ...classes.drawer,
      ...(open ? classes.drawerOpen : classes.drawerClose)
    };
  }}

  .MuiDrawer-paper {
    ${({ theme, open }) => {
      const classes = styles(theme);
      return open ? classes.drawerOpen : classes.drawerClose;
    }}

    &::-webkit-scrollbar {
      width: 2px;
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        display: none;
      }
    }
    &::-webkit-scrollbar-thumb {
      display: none;
    }
    &::-webkit-scrollbar-track {
      display: none;
    }
  }
`;

const PersistentDrawerLeft = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  const handleDrawerClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <StyledDrawer variant="permanent" open={isOpen}>
        <span>sidebar</span>
        <button onClick={handleDrawerClose}>close</button>
      </StyledDrawer>
      <button onClick={handleDrawerOpen}><MenuIcon /></button>
    </div>
  );
};

export default PersistentDrawerLeft;
