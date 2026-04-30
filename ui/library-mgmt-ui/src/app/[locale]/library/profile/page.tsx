'use client';
import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Avatar,
  TextField,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  InputAdornment,
  Divider,
  styled,
  useTheme
} from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import LockResetIcon from '@mui/icons-material/LockReset';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ProfileAvatarWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&:hover .MuiIconButton-root': {
    transform: 'scale(1.1)',
  }
}));

const NavPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 32,
  padding: theme.spacing(1),
  boxShadow: '0 4px 24px rgba(25, 28, 30, 0.04)',
  border: '1px solid #eceef0',
  position: 'sticky',
  top: 96,
}));

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: 40,
  boxShadow: '0 4px 24px rgba(25, 28, 30, 0.04)',
  border: '1px solid #eceef0',
  position: 'relative',
  overflow: 'hidden',
}));

const ProfilePage = () => {
  const theme = useTheme();
  return (
    <Box sx={{ p: { xs: 2, md: 8 }, maxWidth: 1024, mx: 'auto' }}>
      {/* Hero Header Section */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'flex-end' }, gap: 5, mb: 8 }}>
        <ProfileAvatarWrapper>
          <Box sx={{ 
            width: 176, 
            height: 176, 
            borderRadius: 8, 
            bgcolor: 'primary.main', 
            p: 0.5, 
            transform: 'rotate(3deg)',
            boxShadow: '0 24px 48px rgba(0, 108, 70, 0.2)',
            transition: 'transform 0.5s ease',
            '&:hover': { transform: 'rotate(0deg)' }
          }}>
            <Avatar 
              src="https://images.unsplash.com/photo-1559839734-2b71f1536783?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80" 
              sx={{ width: '100%', height: '100%', borderRadius: 7 }} 
            />
          </Box>
          <IconButton 
            sx={{ 
              position: 'absolute', 
              bottom: -8, 
              right: -8, 
              bgcolor: 'background.paper', 
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              border: '1px solid #eceef0',
              p: 1.5,
              '&:hover': { bgcolor: '#f8f9fb' }
            }}
          >
            <PhotoCameraIcon sx={{ fontSize: 18, color: 'primary.main' }} />
          </IconButton>
        </ProfileAvatarWrapper>
        
        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
          <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={2} sx={{ mb: 1 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: '-0.03em' }}>Admin User</Typography>
            <Chip 
              label="Chief Librarian" 
              size="small" 
              sx={{ 
                borderRadius: 10, 
                fontWeight: 900, 
                fontSize: 10, 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em',
                bgcolor: 'primary.main' + '11',
                color: 'primary.main',
                border: '1px solid' + theme.palette.primary.main + '22'
              }} 
            />
          </Stack>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 700, mb: 1 }}>admin@atrium.edu</Typography>
          <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em', bgcolor: '#f2f4f6', px: 1.5, py: 0.5, borderRadius: 1.5 }}>
            Account ID: LIB-00829-ADM
          </Typography>
        </Box>
        
        <Button 
          variant="outlined" 
          sx={{ 
            borderRadius: 4, 
            px: 4, 
            py: 1.5, 
            fontWeight: 900, 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em', 
            fontSize: 11,
            color: 'text.primary',
            borderColor: '#eceef0',
            '&:hover': { bgcolor: '#f8f9fb', borderColor: '#d0d3d6' }
          }}
        >
          View Public Profile
        </Button>
      </Box>

      {/* Settings Layout */}
      <Grid container spacing={5}>
        {/* Navigation */}
        <Grid item xs={12} lg={4}>
          <NavPaper elevation={0}>
            <List sx={{ p: 0 }}>
              {[
                { label: "Personal Profile", icon: <PersonIcon />, active: true },
                { label: "Security", icon: <LockIcon />, active: false },
                { label: "Notifications", icon: <NotificationsIcon />, active: false },
                { label: "Data Management", icon: <CloudDoneIcon />, active: false },
              ].map((item, i) => (
                <ListItem key={i} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton 
                    selected={item.active}
                    sx={{ 
                      borderRadius: 4, 
                      p: 2.5,
                      '&.Mui-selected': { 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        boxShadow: `0 8px 16px ${theme.palette.primary.main}33`,
                        '& .MuiListItemIcon-root': { color: 'white' },
                        '&:hover': { bgcolor: 'primary.dark' }
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 44, color: 'text.disabled' }}>{item.icon}</ListItemIcon>
                    <ListItemText 
                      primary={item.label} 
                      primaryTypographyProps={{ 
                        sx: { fontWeight: item.active ? 900 : 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' } 
                      }} 
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </NavPaper>
        </Grid>

        {/* Form Modules */}
        <Grid item xs={12} lg={8}>
          <Stack spacing={6} sx={{ pb: 10 }}>
            {/* Personal Information */}
            <SectionPaper elevation={0}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>Personal Information</Typography>
                <Button sx={{ fontWeight: 900, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Edit All</Button>
              </Box>
              <Grid container spacing={4}>
                {[
                  { label: "Full Name", val: "Admin User" },
                  { label: "Email Address", val: "admin@atrium.edu" },
                  { label: "Phone Number", val: "+1 (555) 012-3456" },
                  { label: "Department", val: "Central Library Management" },
                ].map((field, i) => (
                  <Grid item xs={12} md={6} key={i}>
                    <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em', px: 1, mb: 1, display: 'block' }}>
                      {field.label}
                    </Typography>
                    <Paper 
                      variant="outlined" 
                      sx={{ p: 2, borderRadius: 3, bgcolor: '#f8f9fb', border: '1px solid #eceef0' }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>{field.val}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </SectionPaper>

            {/* Security Card */}
            <SectionPaper elevation={0}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 6 }}>
                <Avatar sx={{ bgcolor: 'error.main' + '11', color: 'error.main', borderRadius: 3, width: 56, height: 56 }}>
                  <LockResetIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>Change Password</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Last updated 3 months ago
                  </Typography>
                </Box>
              </Box>
              <Stack spacing={4}>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em', px: 1, mb: 1, display: 'block' }}>
                    Current Password
                  </Typography>
                  <TextField 
                    fullWidth 
                    type="password" 
                    placeholder="••••••••••••"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small"><VisibilityIcon sx={{ fontSize: 18 }} /></IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em', px: 1, mb: 1, display: 'block' }}>
                      New Password
                    </Typography>
                    <TextField fullWidth type="password" placeholder="New" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em', px: 1, mb: 1, display: 'block' }}>
                      Confirm New
                    </Typography>
                    <TextField fullWidth type="password" placeholder="Repeat" />
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 3, pt: 2 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.05em', maxWidth: 240 }}>
                    Password must be at least 12 characters and include a special symbol.
                  </Typography>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      borderRadius: 4, 
                      px: 6, 
                      py: 1.5, 
                      fontWeight: 900, 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.15em', 
                      boxShadow: `0 8px 16px ${theme.palette.primary.main}33` 
                    }}
                  >
                    Update Password
                  </Button>
                </Box>
              </Stack>
            </SectionPaper>

            {/* Activity Logs */}
            <Paper 
              variant="outlined" 
              sx={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #eceef0' }}
            >
              <Box sx={{ p: 4, px: 6, borderBottom: '1px solid #eceef0', bgcolor: '#f8f9fb55' }}>
                <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Security Activity</Typography>
              </Box>
              <List disablePadding>
                <ListItem 
                  sx={{ py: 3, px: 6, '&:hover': { bgcolor: '#f8f9fb55' } }}
                  secondaryAction={<Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase' }}>2 mins ago</Typography>}
                >
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', boxShadow: `0 0 8px ${theme.palette.primary.main}88` }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Successful Login" 
                    secondary="Chrome on MacOS • Los Angeles, CA" 
                    primaryTypographyProps={{ sx: { fontWeight: 900, fontSize: 13 } }}
                    secondaryTypographyProps={{ sx: { fontWeight: 800, fontSize: 10, textTransform: 'uppercase', color: 'text.disabled', mt: 0.5 } }}
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem 
                  sx={{ py: 3, px: 6, '&:hover': { bgcolor: '#f8f9fb55' } }}
                  secondaryAction={<Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase' }}>Oct 12, 10:45 AM</Typography>}
                >
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#d0d3d6' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Profile Details Updated" 
                    secondary="Internal Admin Panel" 
                    primaryTypographyProps={{ sx: { fontWeight: 900, fontSize: 13 } }}
                    secondaryTypographyProps={{ sx: { fontWeight: 800, fontSize: 10, textTransform: 'uppercase', color: 'text.disabled', mt: 0.5 } }}
                  />
                </ListItem>
              </List>
              <Button 
                fullWidth 
                sx={{ 
                  py: 3, 
                  bgcolor: '#f8f9fb55', 
                  borderRadius: 0, 
                  fontWeight: 900, 
                  fontSize: 10, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.15em',
                  color: 'primary.main',
                  '&:hover': { bgcolor: '#f2f4f6' }
                }}
              >
                View Full Audit Trail
              </Button>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
