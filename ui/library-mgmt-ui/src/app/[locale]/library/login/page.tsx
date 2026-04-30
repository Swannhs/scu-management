'use client';
import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  Stack,
  IconButton,
  InputAdornment,
  styled,
  useTheme
} from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoginIcon from '@mui/icons-material/Login';

const LoginBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    opacity: 0.03,
    pointerEvents: 'none',
    backgroundImage: `radial-gradient(${theme.palette.primary.main} 0.5px, transparent 0.5px)`,
    backgroundSize: '32px 32px',
  }
}));

const StyledLoginCard = styled(Paper)(({ theme }) => ({
  borderRadius: 48,
  padding: theme.spacing(8),
  boxShadow: '0 32px 64px rgba(0,0,0,0.05)',
  border: '1px solid #eceef0',
  backgroundColor: theme.palette.background.paper,
  width: '100%',
  maxWidth: 440,
  position: 'relative',
  zIndex: 10,
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: -12,
    borderRadius: 60,
    border: '8px solid rgba(0, 108, 70, 0.02)',
    pointerEvents: 'none',
    zIndex: -1
  }
}));

const LoginPage = () => {
  const theme = useTheme();
  return (
    <LoginBackground>
      {/* Top Header */}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 80, px: 4, position: 'relative', zIndex: 50 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40, borderRadius: 2.5, boxShadow: `0 8px 16px ${theme.palette.primary.main}33` }}>
            <AccountBalanceIcon />
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: 'text.primary' }}>
            Precision Atrium
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <IconButton sx={{ color: 'text.disabled' }}><HelpOutlineIcon /></IconButton>
          <IconButton sx={{ color: 'text.disabled' }}><DarkModeIcon /></IconButton>
        </Stack>
      </Box>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: 3, position: 'relative', zIndex: 10 }}>
        <StyledLoginCard elevation={0}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-0.02em', mb: 1 }}>Admin Portal</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary' }}>Access the institutional management suite</Typography>
          </Box>

          <Stack spacing={4} component="form">
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em', px: 1, mb: 1, display: 'block' }}>
                Email or Username
              </Typography>
              <TextField 
                fullWidth 
                placeholder="admin@atrium.edu"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em', px: 1, mb: 1, display: 'block' }}>
                Password
              </Typography>
              <TextField 
                fullWidth 
                type="password"
                placeholder="••••••••"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small"><VisibilityIcon sx={{ fontSize: 18 }} /></IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel 
                control={<Checkbox size="small" />} 
                label={<Typography variant="caption" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'text.secondary' }}>Remember me</Typography>} 
              />
              <Link href="#" sx={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Forgot password?
              </Link>
            </Box>

            <Button 
              fullWidth 
              variant="contained" 
              endIcon={<LoginIcon />}
              sx={{ 
                py: 2, 
                borderRadius: 4, 
                fontWeight: 900, 
                textTransform: 'uppercase', 
                letterSpacing: '0.2em', 
                fontSize: 12,
                boxShadow: `0 12px 24px ${theme.palette.primary.main}33`
              }}
            >
              Sign In
            </Button>
          </Stack>

          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 2 }}>
              Internal System Access Only. <br/>
              <Link href="#" sx={{ color: 'primary.main', textDecoration: 'none', mx: 1 }}>Security Policy</Link> • 
              <Link href="#" sx={{ color: 'primary.main', textDecoration: 'none', mx: 1 }}>Need help?</Link>
            </Typography>
          </Box>
        </StyledLoginCard>

        {/* System Status Widget */}
        <Paper elevation={0} sx={{ mt: 4, px: 4, py: 2, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'background.paper', border: '1px solid #eceef0' }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'primary.main', boxShadow: `0 0 12px ${theme.palette.primary.main}`, animation: 'pulse 2s infinite' }} />
          <Typography variant="caption" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em' }}>All Nodes Operational</Typography>
        </Paper>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 6, px: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f2f4f6', mt: 4 }}>
        <Typography variant="caption" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'text.disabled', mb: { xs: 2, md: 0 } }}>
          © 2024 Precision Atrium Systems
        </Typography>
        <Stack direction="row" spacing={6}>
          {['Privacy', 'Terms', 'Status'].map((link) => (
            <Link key={link} href="#" sx={{ fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'text.disabled', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
              {link}
            </Link>
          ))}
        </Stack>
      </Box>
    </LoginBackground>
  );
};

export default LoginPage;
