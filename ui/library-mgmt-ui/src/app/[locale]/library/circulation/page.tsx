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
  Stack,
  Paper,
  Divider,
  IconButton,
  Chip,
  InputAdornment,
  styled,
  useTheme
} from "@mui/material";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const StatusDot = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0 0 8px ${theme.palette.primary.main}`,
}));

const PanelPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 32,
  boxShadow: '0 4px 24px rgba(25, 28, 30, 0.04)',
  border: '1px solid #eceef0',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const BookItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5),
  backgroundColor: '#f8f9fb',
  borderRadius: 16,
  border: '1px solid transparent',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: '#f2f4f6',
    borderColor: '#eceef0',
    '& .return-btn': { opacity: 1 }
  }
}));

const SelectedBookCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#f8f9fb',
  borderRadius: 16,
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  border: '1px solid #eceef0',
}));

const CirculationPage = () => {
  const theme = useTheme();
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pb: 16, maxWidth: 1280, mx: 'auto' }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: '-0.03em', mb: 1 }}>Issue & Return</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, maxWidth: 480 }}>
            Manage campus book transactions with high-precision tracking and automated due-date handling.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#f2f4f6', px: 2, py: 1, borderRadius: 3 }}>
          <StatusDot />
          <Typography variant="caption" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>System Live</Typography>
        </Box>
      </Box>

      {/* Main Workspace */}
      <Grid container spacing={4}>
        {/* Left Panel: Member Focus */}
        <Grid item xs={12} lg={5}>
          <Stack spacing={3}>
            <TextField 
              fullWidth 
              placeholder="Scan Member ID or search name..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonSearchIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
            />
            
            <PanelPaper elevation={0}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, mb: 4 }}>
                <Avatar 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  sx={{ width: 80, height: 80, borderRadius: 4, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                />
                <Box sx={{ flex: 1 }}>
                  <Chip 
                    label="Active Member" 
                    size="small" 
                    sx={{ 
                      borderRadius: 1, 
                      fontWeight: 900, 
                      fontSize: 9, 
                      textTransform: 'uppercase', 
                      bgcolor: 'primary.main' + '11', 
                      color: 'primary.main' 
                    }} 
                  />
                  <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>Alex Rivera</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>STU-88219 • Computer Science</Typography>
                </Box>
                <IconButton size="small"><CancelIcon sx={{ color: 'text.disabled', fontSize: 20 }} /></IconButton>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, px: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  Current Issued Books
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'primary.main' }}>3 / 5 Limit</Typography>
              </Box>

              <Stack spacing={1.5}>
                {[
                  { title: "Data Structures 101", due: "Oct 12, 2023", cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" },
                  { title: "Algorithms in Java", due: "Overdue: 2 Days", cover: "https://images.unsplash.com/photo-1509228468518-180dd482180c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80", overdue: true },
                ].map((item, idx) => (
                  <BookItem key={idx}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box component="img" src={item.cover} sx={{ width: 40, height: 56, borderRadius: 1.5, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1.2 }}>{item.title}</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 900, color: item.overdue ? 'error.main' : 'text.disabled', mt: 0.5, display: 'block' }}>
                          {item.overdue ? item.due : `Due: ${item.due}`}
                        </Typography>
                      </Box>
                    </Stack>
                    <Button 
                      className="return-btn" 
                      variant="outlined" 
                      size="small" 
                      sx={{ 
                        opacity: 0, 
                        transition: 'opacity 0.2s', 
                        fontSize: 10, 
                        fontWeight: 900, 
                        borderRadius: 2,
                        borderColor: '#eceef0',
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'primary.main', color: 'white' }
                      }}
                    >
                      Return
                    </Button>
                  </BookItem>
                ))}
              </Stack>
            </PanelPaper>
          </Stack>
        </Grid>

        {/* Right Panel: Book Focus */}
        <Grid item xs={12} lg={7}>
          <Stack spacing={3} sx={{ height: '100%' }}>
            <TextField 
              fullWidth 
              placeholder="Scan Book ISBN or search title..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AutoStoriesIcon sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              }}
            />

            <PanelPaper elevation={0}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>Selected Books</Typography>
                <Button sx={{ fontWeight: 900, fontSize: 10, textTransform: 'uppercase', color: 'primary.main' }}>Clear All</Button>
              </Box>

              <Grid container spacing={2} sx={{ flex: 1 }}>
                {[
                  { title: "The Creative Mind", ref: "B-2910", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" },
                  { title: "Mastery in Architecture", ref: "B-4482", cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" },
                ].map((book, idx) => (
                  <Grid item xs={12} md={6} key={idx}>
                    <SelectedBookCard>
                      <Box component="img" src={book.cover} sx={{ width: 64, height: 96, borderRadius: 2, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }} />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 900, mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.disabled', display: 'block', mb: 1 }}>Ref: {book.ref}</Typography>
                        <IconButton size="small" sx={{ color: 'text.disabled', '&:hover': { color: 'error.main' } }}>
                          <DeleteIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Box>
                    </SelectedBookCard>
                  </Grid>
                ))}
                <Grid item xs={12} md={6}>
                  <Box 
                    sx={{ 
                      height: '100%', 
                      border: '2px dashed #eceef0', 
                      borderRadius: 4, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      py: 3, 
                      color: 'text.disabled',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': { borderColor: 'primary.main' + '66', color: 'primary.main', bgcolor: 'primary.main' + '08' }
                    }}
                  >
                    <AddCircleIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="caption" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Add Another</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 6, pt: 4, borderTop: '1px dashed #eceef0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 0.5, display: 'block' }}>Issue Mode</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>Standard (14 Days)</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 0.5, display: 'block' }}>Current Fine</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 900, color: 'error.main' }}>$4.50 (Overdue)</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 0.5, display: 'block' }}>Session ID</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>TXN-00921-A</Typography>
                </Box>
              </Box>
            </PanelPaper>
          </Stack>
        </Grid>
      </Grid>

      {/* Bottom Action Bar */}
      <Paper 
        elevation={12} 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 256, 
          right: 0, 
          bgcolor: 'rgba(255,255,255,0.8)', 
          backdropFilter: 'blur(16px)', 
          px: 6, 
          py: 3, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          borderTop: '1px solid #eceef0', 
          zIndex: 1000 
        }}
      >
        <Stack direction="row" spacing={6} alignItems="center">
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 0.5, display: 'block' }}>Return Due Date</Typography>
            <Paper 
              variant="outlined" 
              sx={{ 
                px: 2, 
                py: 0.75, 
                borderRadius: 3, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5, 
                bgcolor: '#f2f4f6', 
                border: '1px solid transparent',
                '&:focus-within': { borderColor: 'primary.main' + '44' }
              }}
            >
              <CalendarTodayIcon sx={{ color: 'primary.main', fontSize: 18 }} />
              <Typography sx={{ fontSize: 13, fontWeight: 900 }}>Oct 26, 2023</Typography>
            </Paper>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ height: 40, alignSelf: 'center' }} />
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>Total Selected Items: <Box component="span" sx={{ color: 'text.primary', fontWeight: 900 }}>2 Books</Box></Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>Transaction Status: <Box component="span" sx={{ color: 'primary.main', fontWeight: 900 }}>Validated</Box></Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: '#f2f4f6', 
              color: 'text.primary', 
              '&:hover': { bgcolor: '#e6e8ea' }, 
              boxShadow: 'none', 
              px: 4, 
              borderRadius: 3, 
              fontWeight: 900, 
              textTransform: 'none' 
            }}
          >
            Process Returns
          </Button>
          <Button 
            variant="contained" 
            sx={{ 
              background: 'linear-gradient(135deg, #006c46 0%, #00a76f 100%)', 
              boxShadow: `0 8px 16px ${theme.palette.primary.main}33`, 
              px: 5, 
              borderRadius: 3, 
              fontWeight: 900, 
              textTransform: 'none' 
            }}
          >
            Issue Selected Books
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default CirculationPage;
