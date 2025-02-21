import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText, useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ReportIcon from "@mui/icons-material/Report";
import SettingsIcon from "@mui/icons-material/Settings";
import SchoolIcon from "@mui/icons-material/School";
import CategoryIcon from "@mui/icons-material/Category";

const sidebarItems = [
  { text: "Home", icon: <HomeIcon />, path: "/" },
  { text: "Escolas", icon: <SchoolIcon />, path: "/escolas" },
  { text: "Tipologias", icon: <CategoryIcon />, path: "/tipologias" },
  { text: "Relatórios", icon: <ReportIcon />, path: "/relatorios" },
  { text: "Configurações", icon: <SettingsIcon />, path: "/configuracoes" },
];

const Sidebar = ({ 
  mobileOpen, 
  handleDrawerToggle, 
  desktopOpen, 
  handleDesktopToggle, 
  isMobile,
  drawerWidth 
}) => {
  const theme = useTheme();

  const renderSidebarContent = () => (
    <Box 
      sx={{ 
        width: drawerWidth, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column' 
      }}
    >
      <List>
        {sidebarItems.map((item) => (
          <ListItem 
            key={item.text} 
            component={Link} 
            to={item.path}
            onClick={isMobile ? handleDrawerToggle : undefined}
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              borderRadius: 2,
              margin: 1,
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth 
            },
          }}
        >
          {renderSidebarContent()}
        </Drawer>
      )}

      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer
          variant="persistent"
          anchor="left"
          open={desktopOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              position: 'relative',
            },
          }}
        >
          {renderSidebarContent()}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
