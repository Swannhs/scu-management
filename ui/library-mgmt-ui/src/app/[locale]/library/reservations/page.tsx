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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Stack,
  Chip,
  IconButton,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  styled,
  useTheme
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 32,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  boxShadow: '0 4px 24px rgba(25, 28, 30, 0.04)',
  border: '1px solid #eceef0',
  height: '100%',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 40,
  boxShadow: '0 4px 24px rgba(25, 28, 30, 0.04)',
  border: '1px solid #eceef0',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
}));

const ReservationPage = () => {
  const theme = useTheme();
  const reservations = [
    {
      book: {
        title: "The Design of Everyday Things",
        author: "Don Norman",
        isbn: "978-0465050659",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      },
      member: {
        name: "Johnathan Doe",
        id: "LIB-2024-8842",
        initials: "JD",
      },
      date: "Oct 24, 2023",
      time: "10:45 AM",
      status: "Pending",
    },
    {
      book: {
        title: "Clean Architecture",
        author: "Robert C. Martin",
        isbn: "978-0134494166",
        cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      },
      member: {
        name: "Alice Wong",
        id: "LIB-2024-1102",
        initials: "AW",
      },
      date: "Oct 23, 2023",
      time: "02:15 PM",
      status: "Approved",
    },
    {
      book: {
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        isbn: "978-0374275631",
        cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      },
      member: {
        name: "Marcus Smith",
        id: "LIB-2024-3490",
        initials: "MS",
      },
      date: "Oct 22, 2023",
      time: "09:30 AM",
      status: "Cancelled",
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1280, mx: 'auto' }}>
      {/* Page Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6, flexWrap: 'wrap', gap: 4 }}>
        <Box sx={{ maxWidth: 640 }}>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, letterSpacing: '-0.03em' }}>
            Reservation Queue
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, lineHeight: 1.5 }}>
            Manage and process book reservations from the campus community with real-time status updates.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: 'linear-gradient(135deg, #006c46 0%, #00a76f 100%)',
            px: 5,
            py: 2,
            borderRadius: 4,
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.75rem'
          }}
        >
          New Reservation
        </Button>
      </Box>

      {/* Metrics Row */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {[
          { label: "Pending", val: "24", icon: <PendingActionsIcon />, color: "warning" },
          { label: "Approved", val: "142", icon: <CheckCircleIcon />, color: "primary", border: true },
          { label: "Cancelled", val: "12", icon: <CancelIcon />, color: "error" },
          { label: "Total Today", val: "178", icon: <HistoryIcon />, color: "info" },
        ].map((metric, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <MetricCard elevation={0} sx={{ borderLeft: metric.border ? `8px solid ${theme.palette.primary.main}` : undefined }}>
              <Avatar sx={{ bgcolor: `${metric.color}.main` + '11', color: `${metric.color}.main`, borderRadius: 4, width: 56, height: 56 }}>
                {React.cloneElement(metric.icon as React.ReactElement, { sx: { fontSize: 32 } })}
              </Avatar>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', mb: 0.5 }}>
                  {metric.label}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>{metric.val}</Typography>
              </Box>
            </MetricCard>
          </Grid>
        ))}
      </Grid>

      {/* Table Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 3 }}>
        <Stack direction="row" spacing={2} sx={{ flex: 1, minWidth: 300 }}>
          <TextField
            placeholder="Search by book or member ID..."
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#f2f4f6',
                borderRadius: 4,
                px: 2,
                '& fieldset': { border: 'none' }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
          <Select
            defaultValue="Status: All"
            sx={{
              minWidth: 180,
              bgcolor: '#f2f4f6',
              borderRadius: 4,
              '& .MuiSelect-select': { py: 1.5, fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' },
              '& fieldset': { border: 'none' }
            }}
          >
            <MenuItem value="Status: All">Status: All</MenuItem>
            <MenuItem value="Status: Pending">Status: Pending</MenuItem>
            <MenuItem value="Status: Approved">Status: Approved</MenuItem>
          </Select>
        </Stack>
        <Stack direction="row" spacing={2}>
          <IconButton sx={{ bgcolor: '#f2f4f6', borderRadius: 4, p: 2 }}>
            <FileDownloadIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          </IconButton>
          <IconButton sx={{ bgcolor: '#f2f4f6', borderRadius: 4, p: 2 }}>
            <FilterListIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          </IconButton>
        </Stack>
      </Box>

      {/* Data Table */}
      <StyledTableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8f9fb' }}>
              <TableCell sx={{ fontSize: 10, fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', tracking: '0.15em', py: 3, px: 4 }}>Book Title</TableCell>
              <TableCell sx={{ fontSize: 10, fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', tracking: '0.15em', py: 3, px: 4 }}>Reserved By</TableCell>
              <TableCell align="center" sx={{ fontSize: 10, fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', tracking: '0.15em', py: 3, px: 4 }}>Reservation Date</TableCell>
              <TableCell align="center" sx={{ fontSize: 10, fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', tracking: '0.15em', py: 3, px: 4 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontSize: 10, fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', tracking: '0.15em', py: 3, px: 4 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((res, i) => (
              <TableRow key={i} sx={{ '&:hover': { bgcolor: '#f8f9fb55' }, transition: 'background-color 0.2s' }}>
                <TableCell sx={{ py: 3, px: 4 }}>
                  <Stack direction="row" spacing={2.5} alignItems="center">
                    <Box 
                      component="img" 
                      src={res.book.cover} 
                      sx={{ width: 48, height: 64, borderRadius: 3, objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                    />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 900 }}>{res.book.title}</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled', textTransform: 'uppercase', mt: 0.5, display: 'block' }}>
                        {res.book.author} • ISBN: {res.book.isbn}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell sx={{ py: 3, px: 4 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' + '11', color: 'primary.main', fontSize: 10, fontWeight: 900 }}>
                      {res.member.initials}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 900 }}>{res.member.name}</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled', textTransform: 'uppercase', mt: 0.5, display: 'block' }}>
                        ID: {res.member.id}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ py: 3, px: 4 }}>
                  <Typography variant="body2" sx={{ fontWeight: 900 }}>{res.date}</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled', textTransform: 'uppercase', mt: 0.5, display: 'block' }}>
                    {res.time}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ py: 3, px: 4 }}>
                  <Chip 
                    label={res.status} 
                    size="small"
                    sx={{ 
                      borderRadius: 10, 
                      fontWeight: 900, 
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      bgcolor: res.status === 'Pending' ? '#fff3e0' : res.status === 'Approved' ? '#e8f5e9' : '#f5f5f5',
                      color: res.status === 'Pending' ? '#e65100' : res.status === 'Approved' ? '#2e7d32' : '#757575',
                    }} 
                  />
                </TableCell>
                <TableCell align="right" sx={{ py: 3, px: 4 }}>
                  <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                    {res.status === 'Pending' ? (
                      <>
                        <IconButton size="small" sx={{ bgcolor: 'primary.main' + '11', color: 'primary.main', borderRadius: 3, p: 1.5, '&:hover': { bgcolor: 'primary.main', color: 'white' } }}>
                          <CheckIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ bgcolor: 'error.main' + '11', color: 'error.main', borderRadius: 3, p: 1.5, '&:hover': { bgcolor: 'error.main', color: 'white' } }}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton size="small" sx={{ bgcolor: '#f2f4f6', color: 'text.disabled', borderRadius: 3, p: 1.5 }}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ p: 3, bgcolor: '#f8f9fb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Showing 1 to 3 of 24 reservations
          </Typography>
          <Pagination count={8} shape="rounded" color="primary" />
        </Box>
      </StyledTableContainer>

      {/* Footer Insight */}
      <Paper 
        elevation={0} 
        sx={{ 
          mt: 8, 
          p: 6, 
          borderRadius: 10, 
          bgcolor: '#f2f4f6', 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'center', 
          gap: 6 
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', mb: 2 }}>
            Queue Management Tips
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 500, color: 'text.secondary', lineHeight: 1.6, mb: 4 }}>
            Reservations are held for <Box component="span" sx={{ color: 'text.primary', fontWeight: 900 }}>48 hours</Box> after approval. If not picked up by then, the status automatically reverts to 'Cancelled' and moves to the next member in the queue.
          </Typography>
          <Stack direction="row" spacing={4} sx={{ flexWrap: 'wrap', gap: 2 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'orange', boxShadow: '0 4px 12px rgba(255,165,0,0.4)' }} />
              <Typography variant="caption" sx={{ fontWeight: 900, textTransform: 'uppercase', color: 'text.secondary' }}>Pending: Awaiting Staff Review</Typography>
            </Stack>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'primary.main', boxShadow: '0 4px 12px rgba(0,108,70,0.4)' }} />
              <Typography variant="caption" sx={{ fontWeight: 900, textTransform: 'uppercase', color: 'text.secondary' }}>Approved: Ready for Collection</Typography>
            </Stack>
          </Stack>
        </Box>
        <Paper 
          elevation={12} 
          sx={{ 
            width: 224, 
            height: 160, 
            flexShrink: 0, 
            borderRadius: 6, 
            p: 3, 
            position: 'relative', 
            bgcolor: theme.palette.background.paper,
            border: '1px solid #eceef0'
          }}
        >
          <Stack spacing={2}>
            <Box sx={{ height: 10, width: '100%', bgcolor: '#f2f4f6', borderRadius: 5, overflow: 'hidden' }}>
              <Box sx={{ height: '100%', width: '66%', bgcolor: 'primary.main', borderRadius: 5 }} />
            </Box>
            <Box sx={{ height: 10, width: '100%', bgcolor: '#f2f4f6', borderRadius: 5, overflow: 'hidden' }}>
              <Box sx={{ height: '100%', width: '50%', bgcolor: 'info.main', borderRadius: 5 }} />
            </Box>
            <Box sx={{ height: 10, width: '75%', bgcolor: '#f2f4f6', borderRadius: 5, overflow: 'hidden' }}>
              <Box sx={{ height: '100%', width: '75%', bgcolor: 'warning.main', borderRadius: 5 }} />
            </Box>
          </Stack>
          <Avatar 
            sx={{ 
              position: 'absolute', 
              bottom: -16, 
              right: -16, 
              width: 64, 
              height: 64, 
              bgcolor: 'primary.main', 
              boxShadow: '0 8px 24px rgba(0,108,70,0.4)',
              transform: 'rotate(12deg)',
              borderRadius: 4
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 32 }} />
          </Avatar>
        </Paper>
      </Paper>
    </Box>
  );
};

export default ReservationPage;
