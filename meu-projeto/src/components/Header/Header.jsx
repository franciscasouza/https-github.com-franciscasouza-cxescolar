import { AppBar, Toolbar, IconButton, Typography, Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = ({ 
  onLogout, 
  handleDrawerToggle, 
  isMobile, 
  desktopOpen, 
  drawerWidth 
}) => {
  return (
    <AppBar 
      position="fixed"
      sx={{
        width: { 
          xs: '100%', 
          md: `calc(100% - ${desktopOpen ? drawerWidth : 0}px)` 
        },
        marginLeft: { 
          xs: 0, 
          md: `${desktopOpen ? drawerWidth : 0}px` 
        },
        transition: (theme) => theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      <Toolbar>
        {/* Mobile Menu Toggle */}
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button 
            color="inherit" 
            startIcon={<LogoutIcon />} 
            onClick={onLogout}
          >
            Sair
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
