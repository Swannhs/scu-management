'use client';
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Avatar,
  Badge,
  Stack,
  InputAdornment,
  Divider,
  styled,
  useTheme
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const HeaderRoot = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'sticky',
  top: 0,
  zIndex: 1100,
  backgroundColor: 'rgba(242, 244, 246, 0.8)',
  backdropFilter: 'blur(12px)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0, 4),
  height: 64,
  borderBottom: '1px solid #eceef0',
}));

const SearchField = styled(TextField)(({ theme }) => ({
  width: 384,
  '& .MuiOutlinedInput-root': {
    height: 40,
    backgroundColor: '#f2f4f6',
    borderRadius: 12,
    fontSize: '0.875rem',
    '& fieldset': { border: 'none' },
    '&:hover fieldset': { border: 'none' },
    '&.Mui-focused fieldset': { border: 'none' },
  }
}));

const LibraryHeader = () => {
  const theme = useTheme();
  return (
    <HeaderRoot component="header">
      <Stack direction="row" spacing={4} alignItems="center" sx={{ flex: 1 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 800, 
            color: 'primary.main', 
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap'
          }}
        >
          Atrium Library Admin
        </Typography>
        <SearchField 
          placeholder="Search analytics, records, or members..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" spacing={1.5} alignItems="center">
        <IconButton size="medium">
          <Badge color="error" variant="dot" overlap="circular" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <NotificationsIcon sx={{ fontSize: 22, color: 'text.secondary' }} />
          </Badge>
        </IconButton>
        <IconButton size="medium">
          <HelpOutlineIcon sx={{ fontSize: 22, color: 'text.secondary' }} />
        </IconButton>
        
        <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24, alignSelf: 'center' }} />
        
        <Stack 
          direction="row" 
          spacing={1.5} 
          alignItems="center" 
          sx={{ 
            p: 0.5, 
            pr: 2, 
            borderRadius: 3, 
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': { bgcolor: '#f2f4f6' }
          }}
        >
          <Avatar 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="body2" sx={{ fontWeight: 800 }}>Admin</Typography>
        </Stack>
      </Stack>
    </HeaderRoot>
  );
};

export default LibraryHeader;
