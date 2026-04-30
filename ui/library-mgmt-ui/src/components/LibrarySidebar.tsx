'use client';
import React from "react";
import { Link, usePathname } from "@/navigation";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  styled,
  useTheme
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import GroupIcon from '@mui/icons-material/Group';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';

const SidebarRoot = styled(Box)(({ theme }) => ({
  width: 256,
  height: '100vh',
  position: 'fixed',
  left: 0,
  top: 0,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  borderRight: '1px solid #eceef0',
  padding: theme.spacing(3, 2),
  zIndex: 1200,
}));

const LibrarySidebar = () => {
  const pathname = usePathname();
  const theme = useTheme();

  const menuItems = [
    { name: "Dashboard", href: "/library/dashboard", icon: <DashboardIcon /> },
    { name: "Circulation", href: "/library/circulation", icon: <AutoStoriesIcon /> },
    { name: "Inventory", href: "/library/inventory", icon: <Inventory2Icon /> },
    { name: "Members", href: "/library/members", icon: <GroupIcon /> },
    { name: "Reports", href: "/library/reports", icon: <AnalyticsIcon /> },
  ];

  const footerItems = [
    { name: "Settings", href: "/library/settings", icon: <SettingsIcon /> },
    { name: "Logout", href: "/auth/logout", icon: <LogoutIcon />, isError: true },
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <SidebarRoot component="aside">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, mb: 4 }}>
        <Avatar sx={{ bgcolor: 'primary.main', borderRadius: 2.5, width: 40, height: 40, boxShadow: `0 8px 16px ${theme.palette.primary.main}33` }}>
          <AutoStoriesIcon />
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.02em' }}>Precision Atrium</Typography>
          <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Central Library</Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        fullWidth
        startIcon={<AddIcon />}
        sx={{
          mb: 4,
          py: 1.5,
          borderRadius: 3,
          fontWeight: 800,
          textTransform: 'none',
          background: 'linear-gradient(135deg, #006c46 0%, #00a76f 100%)',
          boxShadow: `0 8px 16px ${theme.palette.primary.main}33`,
          '&:hover': { opacity: 0.9 }
        }}
      >
        New Book Entry
      </Button>

      <List sx={{ flex: 1, p: 0 }}>
        {menuItems.map((item) => (
          <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              href={item.href}
              sx={{
                borderRadius: 3,
                px: 2,
                py: 1.25,
                transition: 'all 0.2s',
                ...(isActive(item.href) ? {
                  bgcolor: '#f2f4f6',
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    right: 0,
                    top: '20%',
                    bottom: '20%',
                    width: 4,
                    bgcolor: 'primary.main',
                    borderRadius: '4px 0 0 4px'
                  }
                } : {
                  color: 'text.secondary',
                  '&:hover': { bgcolor: '#f8f9fb', transform: 'translateX(4px)' }
                })
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                {React.cloneElement(item.icon as React.ReactElement, { sx: { fontSize: 20 } })}
              </ListItemIcon>
              <ListItemText 
                primary={item.name} 
                primaryTypographyProps={{ sx: { fontWeight: isActive(item.href) ? 800 : 600, fontSize: '0.875rem' } }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <List sx={{ p: 0 }}>
        {footerItems.map((item) => (
          <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              href={item.href}
              sx={{
                borderRadius: 3,
                px: 2,
                py: 1.25,
                color: item.isError ? 'error.main' : 'text.secondary',
                transition: 'all 0.2s',
                '&:hover': { 
                  bgcolor: item.isError ? 'error.main' + '11' : '#f8f9fb',
                  transform: 'translateX(4px)'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                {React.cloneElement(item.icon as React.ReactElement, { sx: { fontSize: 20 } })}
              </ListItemIcon>
              <ListItemText 
                primary={item.name} 
                primaryTypographyProps={{ sx: { fontWeight: 600, fontSize: '0.875rem' } }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </SidebarRoot>
  );
};

export default LibrarySidebar;
