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
  TextField,
  IconButton,
  InputAdornment,
  styled,
  useTheme
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const FilterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 16,
  boxShadow: '0 4px 24px rgba(25, 28, 30, 0.04)',
  border: '1px solid #eceef0',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 32,
  boxShadow: '0 4px 24px rgba(25, 28, 30, 0.04)',
  border: '1px solid #eceef0',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
}));

const TransactionsPage = () => {
  const theme = useTheme();
  const transactions = [
    {
      member: {
        name: "Alex Rivers",
        id: "LIB-2024-882",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      book: {
        title: "The Silent Patient",
        author: "Alex Michaelides",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      },
      timestamp: {
        date: "Oct 24, 2023",
        time: "02:45 PM",
      },
      action: "ISSUE",
      statusColor: "primary",
    },
    {
      member: {
        name: "Elena Vance",
        id: "LIB-2024-105",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      book: {
        title: "Atomic Habits",
        author: "James Clear",
        cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      },
      timestamp: {
        date: "Oct 24, 2023",
        time: "11:20 AM",
      },
      action: "RETURN",
      statusColor: "info",
    },
    {
      member: {
        name: "Marcus Thorne",
        id: "LIB-2023-492",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      book: {
        title: "Dune: Deluxe Edition",
        author: "Frank Herbert",
        cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      },
      timestamp: {
        date: "Oct 23, 2023",
        time: "05:15 PM",
      },
      action: "ISSUE",
      statusColor: "primary",
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1280, mx: 'auto' }}>
      {/* Page Title Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6, flexWrap: 'wrap', gap: 4 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, letterSpacing: '-0.03em' }}>Transaction History</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
            Review and manage the chronological record of all borrowed and returned assets.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: 'linear-gradient(135deg, #006c46 0%, #00a76f 100%)',
            px: 4,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 800,
            textTransform: 'none',
            boxShadow: `0 8px 16px ${theme.palette.primary.main}33`
          }}
        >
          New Transaction
        </Button>
      </Box>

      {/* Advanced Filter Bar */}
      <Grid container spacing={2} sx={{ mb: 6 }}>
        <Grid item xs={12} lg={5}>
          <FilterPaper elevation={0}>
            <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em', px: 1 }}>Date Range</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField fullWidth type="date" size="small" />
              <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled' }}>TO</Typography>
              <TextField fullWidth type="date" size="small" />
            </Stack>
          </FilterPaper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FilterPaper elevation={0}>
            <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em', px: 1 }}>Member Search</Typography>
            <TextField 
              fullWidth 
              size="small" 
              placeholder="Search by name or ID..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonSearchIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
            />
          </FilterPaper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FilterPaper elevation={0}>
            <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em', px: 1 }}>Book Filter</Typography>
            <TextField 
              fullWidth 
              size="small" 
              placeholder="ISBN or Title..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
            />
          </FilterPaper>
        </Grid>
        <Grid item xs={12} lg={1}>
          <Button 
            fullWidth 
            sx={{ 
              height: '100%', 
              minHeight: 64, 
              borderRadius: 4, 
              bgcolor: 'background.paper', 
              border: '1px solid #eceef0',
              color: 'text.disabled',
              '&:hover': { bgcolor: '#f2f4f6', color: 'primary.main' }
            }}
          >
            <FilterListIcon />
          </Button>
        </Grid>
      </Grid>

      {/* Transaction Table */}
      <StyledTableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8f9fb' }}>
              <TableCell sx={{ fontSize: 10, fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', tracking: '0.15em', py: 3, px: 4 }}>Member</TableCell>
              <TableCell sx={{ fontSize: 10, fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', tracking: '0.15em', py: 3, px: 4 }}>Asset / Book Title</TableCell>
              <TableCell sx={{ fontSize: 10, fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', tracking: '0.15em', py: 3, px: 4 }}>Timestamp</TableCell>
              <TableCell sx={{ fontSize: 10, fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', tracking: '0.15em', py: 3, px: 4 }}>Action</TableCell>
              <TableCell align="right" sx={{ fontSize: 10, fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', tracking: '0.15em', py: 3, px: 4 }}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx, idx) => (
              <TableRow key={idx} sx={{ '&:hover': { bgcolor: '#f8f9fb55' }, transition: 'background-color 0.2s' }}>
                <TableCell sx={{ py: 2, px: 4 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar src={tx.member.avatar} sx={{ width: 36, height: 36, border: `2px solid ${theme.palette.background.paper}` }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>{tx.member.name}</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.disabled' }}>ID: {tx.member.id}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell sx={{ py: 2, px: 4 }}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box component="img" src={tx.book.cover} sx={{ width: 32, height: 44, borderRadius: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                    <Box sx={{ maxWidth: 200 }}>
                      <Typography variant="body2" sx={{ fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tx.book.title}</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.disabled' }}>By {tx.book.author}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell sx={{ py: 2, px: 4 }}>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>{tx.timestamp.date}</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.disabled' }}>{tx.timestamp.time}</Typography>
                </TableCell>
                <TableCell sx={{ py: 2, px: 4 }}>
                  <Chip 
                    label={tx.action} 
                    size="small"
                    sx={{ 
                      borderRadius: 10, 
                      fontWeight: 900, 
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      bgcolor: tx.statusColor === 'primary' ? 'primary.main' + '11' : 'info.main' + '11',
                      color: tx.statusColor === 'primary' ? 'primary.main' : 'info.main',
                      '& .MuiChip-label': { px: 1.5 }
                    }} 
                    icon={<Box sx={{ w: 6, h: 6, borderRadius: '50%', bgcolor: tx.statusColor === 'primary' ? 'primary.main' : 'info.main', ml: 1 }} />}
                  />
                </TableCell>
                <TableCell align="right" sx={{ py: 2, px: 4 }}>
                  <Button sx={{ fontWeight: 900, fontSize: 11, textTransform: 'none', color: 'primary.main' }}>View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ p: 3, bgcolor: '#f8f9fb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Showing 1 to 3 of 1,240 entries
          </Typography>
          <Pagination count={42} shape="rounded" color="primary" />
        </Box>
      </StyledTableContainer>

      {/* Footer Summary */}
      <Grid container spacing={4} sx={{ mt: 4, pb: 8 }}>
        {[
          { label: "Issued Today", val: "124", icon: <CallMadeIcon />, color: "primary" },
          { label: "Returned Today", val: "98", icon: <CallReceivedIcon />, color: "info" },
          { label: "Overdue Items", val: "14", icon: <PriorityHighIcon />, color: "error" },
        ].map((stat, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: 6, display: 'flex', alignItems: 'center', gap: 3, border: '1px solid #eceef0' }}>
              <Avatar sx={{ bgcolor: `${stat.color}.main` + '11', color: `${stat.color}.main`, borderRadius: 3, width: 48, height: 48 }}>
                {stat.icon}
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>{stat.val}</Typography>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{stat.label}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TransactionsPage;
