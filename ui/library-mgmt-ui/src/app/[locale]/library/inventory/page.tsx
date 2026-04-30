'use client';
import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
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
  Avatar,
  IconButton,
  styled,
  useTheme
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BookIcon from '@mui/icons-material/Book';
import ErrorIcon from '@mui/icons-material/Error';
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PrintIcon from '@mui/icons-material/Print';
import QrCodeIcon from '@mui/icons-material/QrCode';
import EditIcon from '@mui/icons-material/Edit';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HistoryIcon from '@mui/icons-material/History';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DatabaseIcon from '@mui/icons-material/Storage';
import SyncIcon from '@mui/icons-material/Sync';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 32,
  boxShadow: '0 4px 24px rgba(25, 28, 30, 0.04)',
  border: '1px solid #eceef0',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
}));

const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 20,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 24px rgba(25, 28, 30, 0.04)',
  border: '1px solid #eceef0',
  '&:hover': {
    backgroundColor: '#f8f9fb',
  }
}));

const InventoryPage = () => {
  const theme = useTheme();
  const inventoryItems = [
    {
      id: "ATL-9823-X1",
      title: "The Architecture of Light",
      meta: "T. Holl (2021) • Hardcover",
      status: "Available",
      location: "Wing A / Floor 2 / A-102",
      statusColor: "primary",
    },
    {
      id: "ATL-7741-C5",
      title: "Principles of Quantum Dynamics",
      meta: "R. Shankar (1994) • Paperback",
      status: "Issued",
      location: "Due: Oct 24, 2023",
      statusColor: "info",
      isDate: true,
    },
    {
      id: "ATL-3329-D4",
      title: "Modernist Cuisine",
      meta: "N. Myhrvold (2011) • Special Ed.",
      status: "Damaged",
      location: "Repair Queue",
      statusColor: "warning",
    },
    {
      id: "ATL-1105-Z8",
      title: "Foundation and Empire",
      meta: "I. Asimov (1952) • Vintage",
      status: "Lost",
      location: "Not Located",
      statusColor: "error",
    },
    {
      id: "ATL-4481-B3",
      title: "Thinking, Fast and Slow",
      meta: "D. Kahneman (2011) • Hardcover",
      status: "Available",
      location: "Wing B / Floor 1 / B-205",
      statusColor: "primary",
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1280, mx: 'auto' }}>
      {/* Dashboard Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5, letterSpacing: '-0.02em' }}>
            Inventory Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and track 12,482 total book copies across all campus wings.
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
            fontWeight: 800
          }}
        >
          Add New Copy
        </Button>
      </Box>

      {/* Bento Filters */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[
          { label: "Available", val: "8,234", icon: <CheckCircleIcon />, color: "primary" },
          { label: "Issued", val: "3,912", icon: <BookIcon />, color: "info" },
          { label: "Damaged/Lost", val: "336", icon: <ErrorIcon />, color: "error" },
        ].map((metric, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <MetricCard elevation={0}>
              <Avatar sx={{ bgcolor: `${metric.color}.main` + '11', color: `${metric.color}.main`, borderRadius: 3, width: 48, height: 48 }}>
                {metric.icon}
              </Avatar>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {metric.label}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>{metric.val}</Typography>
              </Box>
            </MetricCard>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard elevation={0} sx={{ borderStyle: 'dashed', borderWidth: 2 }}>
            <Avatar sx={{ bgcolor: '#f2f4f6', color: 'text.secondary', borderRadius: 3, width: 48, height: 48 }}>
              <FilterListIcon />
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 800 }}>Advanced Filters</Typography>
              <Typography variant="caption" color="text.secondary">By Wing, Shelf, or Genre</Typography>
            </Box>
          </MetricCard>
        </Grid>
      </Grid>

      {/* Inventory Table Container */}
      <StyledTableContainer component={Paper} elevation={0}>
        <Box sx={{ px: 4, py: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eceef0', flexWrap: 'wrap', gap: 2 }}>
          <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
            <Chip label="All Copies" size="small" color="primary" sx={{ fontWeight: 800 }} />
            <Chip label="New Arrivals" size="small" sx={{ fontWeight: 800, bgcolor: '#f2f4f6' }} />
            <Chip label="Reference Only" size="small" sx={{ fontWeight: 800, bgcolor: '#f2f4f6' }} />
            <Chip label="Digital Pairs" size="small" sx={{ fontWeight: 800, bgcolor: '#f2f4f6' }} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button size="small" startIcon={<FileDownloadIcon />} sx={{ fontWeight: 800, color: 'text.secondary' }}>Export CSV</Button>
            <Button size="small" startIcon={<PrintIcon />} sx={{ fontWeight: 800, color: 'text.secondary' }}>Print Labels</Button>
          </Stack>
        </Box>

        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8f9fb' }}>
              <TableCell sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', tracking: '0.1em' }}>Copy ID / Barcode</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', tracking: '0.1em' }}>Book Title</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', tracking: '0.1em' }}>Status</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', tracking: '0.1em' }}>Shelf Location</TableCell>
              <TableCell align="right" sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', tracking: '0.1em' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow key={item.id} sx={{ '&:hover': { bgcolor: '#f8f9fb' }, transition: 'background-color 0.2s' }}>
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <QrCodeIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 800 }}>{item.id}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>{item.title}</Typography>
                  <Typography variant="caption" color="text.secondary">{item.meta}</Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={item.status} 
                    size="small"
                    sx={{ 
                      borderRadius: 10, 
                      fontWeight: 900, 
                      fontSize: 10,
                      bgcolor: `${item.statusColor}.main` + '11',
                      color: `${item.statusColor}.main`,
                      '& .MuiChip-label': { px: 1 }
                    }} 
                    icon={<Box sx={{ w: 6, h: 6, borderRadius: '50%', bgcolor: `${item.statusColor}.main`, ml: 1 }} />}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {item.isDate ? <HistoryIcon sx={{ fontSize: 16, color: 'text.disabled' }} /> : <LocationOnIcon sx={{ fontSize: 16, color: 'text.disabled' }} />}
                    <Typography variant="body2" color={item.isDate ? 'text.secondary' : 'text.primary'} sx={{ fontWeight: 600, fontStyle: item.isDate ? 'italic' : 'normal' }}>
                      {item.location}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton size="small" sx={{ color: 'text.disabled', '&:hover': { bgcolor: '#f2f4f6' } }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" sx={{ '&:hover': { bgcolor: 'error.main' + '11' } }}>
                      <DoNotDisturbOnIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eceef0', bgcolor: '#f8f9fb55' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
            Showing 1 to 5 of 12,482 entries
          </Typography>
          <Pagination count={2497} shape="rounded" color="primary" size="small" />
        </Box>
      </StyledTableContainer>

      {/* Contextual Insights Section */}
      <Grid container spacing={3} sx={{ mt: 4, pb: 4 }}>
        <Grid item xs={12} lg={8}>
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 4, 
              borderRadius: 8, 
              height: '100%', 
              position: 'relative', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 192
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>Shelf Capacity Optimization</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 480, fontWeight: 600, lineHeight: 1.6 }}>
                Wing C is currently at 94% capacity. We recommend shifting 200+ historical records to the West Archive to balance the load.
              </Typography>
            </Box>
            <Box sx={{ position: 'relative', zIndex: 1, mt: 2 }}>
              <Button 
                endIcon={<ArrowForwardIcon />} 
                sx={{ fontWeight: 800, color: 'primary.main', p: 0, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
              >
                Run Rebalance Tool
              </Button>
            </Box>
            <DatabaseIcon sx={{ 
              position: 'absolute', 
              right: -16, 
              bottom: -16, 
              fontSize: 160, 
              color: 'primary.main', 
              opacity: 0.05 
            }} />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper variant="outlined" sx={{ p: 4, borderRadius: 8, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>Recent Scans</Typography>
                <SyncIcon sx={{ color: 'primary.main', fontSize: 20 }} />
              </Box>
              <Stack spacing={2}>
                {[
                  { id: "ATL-0012-Y", time: "2m ago", active: true },
                  { id: "ATL-5521-K", time: "14m ago", active: true },
                  { id: "ATL-1922-A", time: "1h ago", active: false },
                ].map((scan, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: scan.active ? 1 : 0.5 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: scan.active ? 'primary.main' : 'text.disabled' }} />
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{scan.id}</Typography>
                    </Stack>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled' }}>{scan.time}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Button 
              fullWidth 
              variant="contained" 
              sx={{ 
                mt: 4, 
                bgcolor: '#f2f4f6', 
                color: 'text.primary', 
                '&:hover': { bgcolor: '#e6e8ea' },
                boxShadow: 'none',
                borderRadius: 3
              }}
            >
              View Scan Log
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InventoryPage;
