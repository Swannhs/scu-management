'use client';
import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  TextField,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Checkbox,
  Stack,
  Paper,
  Divider,
  styled,
  useTheme
} from "@mui/material";
import GavelIcon from '@mui/icons-material/Gavel';
import SaveIcon from '@mui/icons-material/Save';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ShieldPersonIcon from '@mui/icons-material/ShieldPerson';
import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: 40,
  boxShadow: '0 4px 24px rgba(25, 28, 30, 0.04)',
  border: '1px solid #eceef0',
  height: '100%',
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: '#f8f9fb',
  borderRadius: 16,
  '& fieldset': { border: 'none' },
  '&:hover fieldset': { border: 'none' },
  '&.Mui-focused fieldset': { border: 'none' },
}));

const SettingsPage = () => {
  const theme = useTheme();
  return (
    <Box sx={{ p: { xs: 2, md: 8 }, maxWidth: 1152, mx: 'auto' }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, letterSpacing: '-0.03em' }}>General Configuration</Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
          Manage your institutional rules, fine structures, and notification preferences.
        </Typography>
      </Box>

      {/* Bento Grid Layout for Settings */}
      <Grid container spacing={4}>
        {/* Library Rules (Span 8) */}
        <Grid item xs={12} md={8}>
          <SectionPaper elevation={0}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 6 }}>
              <Avatar sx={{ bgcolor: 'primary.main' + '11', color: 'primary.main', borderRadius: 3, width: 56, height: 56 }}>
                <GavelIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>Library Rules</Typography>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  Define circulation limits and penalties
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em', px: 1, mb: 1, display: 'block' }}>
                  Max Books per User
                </Typography>
                <TextField 
                  fullWidth 
                  type="number" 
                  defaultValue="5"
                  InputProps={{
                    endAdornment: <Typography sx={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: 'text.disabled', letterSpacing: '0.1em' }}>volumes</Typography>
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em', px: 1, mb: 1, display: 'block' }}>
                  Fine per Day
                </Typography>
                <TextField 
                  fullWidth 
                  defaultValue="0.50"
                  InputProps={{
                    startAdornment: <Typography sx={{ fontSize: 14, fontWeight: 900, color: 'primary.main', mr: 1 }}>$</Typography>
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em', px: 1, mb: 1, display: 'block' }}>
                  Loan Duration
                </Typography>
                <StyledSelect fullWidth defaultValue="14 Days (Extended)" IconComponent={UnfoldMoreIcon}>
                  <MenuItem value="7 Days (Standard)">7 Days (Standard)</MenuItem>
                  <MenuItem value="14 Days (Extended)">14 Days (Extended)</MenuItem>
                  <MenuItem value="21 Days (Professional)">21 Days (Professional)</MenuItem>
                  <MenuItem value="30 Days (Academic)">30 Days (Academic)</MenuItem>
                </StyledSelect>
              </Grid>
            </Grid>

            <Box sx={{ mt: 6, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                startIcon={<SaveIcon />}
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
                Update Rules
              </Button>
            </Box>
          </SectionPaper>
        </Grid>

        {/* Notification Settings (Span 4) */}
        <Grid item xs={12} md={4}>
          <SectionPaper elevation={0} sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6 }}>
              <Avatar sx={{ bgcolor: 'info.main' + '11', color: 'info.main', borderRadius: 3, width: 48, height: 48 }}>
                <NotificationsActiveIcon sx={{ fontSize: 24 }} />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>Notifications</Typography>
            </Box>
            
            <Stack spacing={4}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>Email Notifications</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', fontSize: 9 }}>Weekly summary & alerts</Typography>
                </Box>
                <Switch defaultChecked color="primary" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>SMS Alerts</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', fontSize: 9 }}>Urgent overdue notices</Typography>
                </Box>
                <Switch color="primary" />
              </Box>
              
              <Divider />
              
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em', mb: 3, display: 'block' }}>
                  Event Subscriptions
                </Typography>
                <Stack spacing={2}>
                  {["Overdue Books", "New Reservations", "System Updates"].map((event) => (
                    <FormControlLabel 
                      key={event}
                      control={<Checkbox size="small" defaultChecked={event !== "System Updates"} />} 
                      label={<Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>{event}</Typography>} 
                    />
                  ))}
                </Stack>
              </Box>
            </Stack>
          </SectionPaper>
        </Grid>

        {/* Roles & Permissions (Span 12) */}
        <Grid item xs={12}>
          <SectionPaper elevation={0}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 8, flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar sx={{ bgcolor: 'warning.main' + '11', color: 'warning.main', borderRadius: 3, width: 56, height: 56 }}>
                  <ShieldPersonIcon sx={{ fontSize: 32 }} />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>Roles & Permissions</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    Manage access levels for library staff
                  </Typography>
                </Box>
              </Box>
              <Button 
                variant="outlined" 
                startIcon={<AddIcon />}
                sx={{ 
                  borderRadius: 4, 
                  px: 4, 
                  py: 1.5, 
                  fontWeight: 900, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.15em',
                  fontSize: 10,
                  bgcolor: '#f8f9fb',
                  color: 'text.primary',
                  borderColor: '#eceef0'
                }}
              >
                Create Role
              </Button>
            </Box>

            <Box sx={{ overflow: 'hidden' }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', px: 4, py: 2, bgcolor: '#f8f9fb', borderRadius: 4, mb: 2 }}>
                <Box sx={{ gridColumn: 'span 4' }}><Typography sx={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: 'text.disabled', letterSpacing: '0.15em' }}>Role Title</Typography></Box>
                <Box sx={{ gridColumn: 'span 5' }}><Typography sx={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: 'text.disabled', letterSpacing: '0.15em' }}>Permission Level</Typography></Box>
                <Box sx={{ gridColumn: 'span 3', textAlign: 'right' }}><Typography sx={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', color: 'text.disabled', letterSpacing: '0.15em' }}>Actions</Typography></Box>
              </Box>
              
              <Stack spacing={2}>
                {[
                  { title: "Admin", icon: <AdminPanelSettingsIcon />, color: "primary", perms: ["Full Access", "System Root"] },
                  { title: "Librarian", icon: <PersonSearchIcon />, color: "info", perms: ["Catalog Edit", "Circulation"] },
                ].map((role) => (
                  <Box 
                    key={role.title} 
                    sx={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(12, 1fr)', 
                      alignItems: 'center', 
                      px: 4, 
                      py: 3, 
                      borderRadius: 4, 
                      transition: 'all 0.2s',
                      border: '1px solid transparent',
                      '&:hover': { bgcolor: '#f8f9fb55', borderColor: '#eceef0' }
                    }}
                  >
                    <Box sx={{ gridColumn: 'span 4', display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: `${role.color}.main` + '11', color: `${role.color}.main`, width: 40, height: 40 }}>
                        {role.icon}
                      </Avatar>
                      <Typography sx={{ fontWeight: 900 }}>{role.title}</Typography>
                    </Box>
                    <Stack direction="row" spacing={1.5} sx={{ gridColumn: 'span 5' }}>
                      {role.perms.map((perm) => (
                        <Chip 
                          key={perm} 
                          label={perm} 
                          size="small" 
                          sx={{ 
                            borderRadius: 10, 
                            fontWeight: 900, 
                            fontSize: 9, 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.05em',
                            bgcolor: role.title === 'Admin' ? 'primary.main' + '11' : '#f2f4f6',
                            color: role.title === 'Admin' ? 'primary.main' : 'text.disabled'
                          }} 
                        />
                      ))}
                    </Stack>
                    <Box sx={{ gridColumn: 'span 3', textAlign: 'right' }}>
                      <Button sx={{ fontWeight: 900, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Edit Permissions</Button>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </SectionPaper>
        </Grid>
      </Grid>

      {/* Footer Support Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          mt: 8, 
          p: 8, 
          borderRadius: 12, 
          background: 'linear-gradient(135deg, #006c46 0%, #00a76f 100%)',
          color: 'white',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 6,
          boxShadow: '0 24px 48px rgba(0, 108, 70, 0.2)',
          mb: 8
        }}
      >
        <Stack direction="row" spacing={4} alignItems="center">
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6 }}>
            <AutoAwesomeIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, letterSpacing: '-0.02em' }}>Need Help with Configuration?</Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500, maxWidth: 440 }}>
              Our campus management specialists are available 24/7 for technical support and institutional onboarding.
            </Typography>
          </Box>
        </Stack>
        <Button 
          variant="contained" 
          endIcon={<ArrowForwardIcon />}
          sx={{ 
            bgcolor: 'white', 
            color: 'primary.main', 
            fontWeight: 900, 
            borderRadius: 4, 
            px: 6, 
            py: 2, 
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            '&:hover': { bgcolor: '#f2f4f6' }
          }}
        >
          Contact Support
        </Button>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
