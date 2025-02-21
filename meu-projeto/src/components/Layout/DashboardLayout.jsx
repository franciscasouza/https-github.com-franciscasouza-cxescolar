import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { 
  Box, 
  Toolbar, 
  IconButton, 
  AppBar, 
  Typography, 
  useMediaQuery, 
  useTheme 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const DashboardLayout = ({ children, onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(!isMobile);

  // Adjust sidebar based on screen size
  useEffect(() => {
    setDesktopOpen(!isMobile);
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDesktopToggle = () => {
    setDesktopOpen(!desktopOpen);
  };

  const drawerWidth = isMobile ? '100%' : 240;

  return (
    <Box 
      sx={{ 
        display: "flex", 
        minHeight: "100vh",
        flexDirection: "column"
      }}
    >
      {/* Responsive Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        desktopOpen={desktopOpen}
        handleDesktopToggle={handleDesktopToggle}
        isMobile={isMobile}
        drawerWidth={drawerWidth}
      />

      {/* Responsive Header */}
      <Header
        onLogout={onLogout}
        handleDrawerToggle={handleDrawerToggle}
        handleDesktopToggle={handleDesktopToggle}
        isMobile={isMobile}
        desktopOpen={desktopOpen}
        drawerWidth={drawerWidth}
      />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { 
            xs: '100%', 
            md: `calc(100% - ${desktopOpen ? drawerWidth : 0}px)` 
          },
          marginLeft: { 
            xs: 0, 
            md: `${desktopOpen ? drawerWidth : 0}px` 
          },
          padding: theme => theme.spacing(3),
          transition: theme => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar /> {/* Spacing for AppBar */}
        
        <Box 
          sx={{ 
            width: '100%', 
            maxWidth: 1200,
            margin: '0 auto',
            padding: theme => theme.spacing(2)
          }}
        >
          {children}
        </Box>
        
        <Footer />
      </Box>
    </Box>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default DashboardLayout;
