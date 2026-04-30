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
  LinearProgress,
  IconButton,
  styled,
  useTheme
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FilterListIcon from '@mui/icons-material/FilterList';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MailIcon from '@mui/icons-material/Mail';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentsIcon from '@mui/icons-material/Payments';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

const MetricCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 32,
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

const FinesPage = () => {
  const theme = useTheme();
  const recentFines = [
    {
      member: {
        name: "Julian Wan",
        id: "#LB-8291",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      reason: "The Architecture of Happiness",
      meta: "Overdue (12 Days)",
      amount: "$12.00",
      status: "Unpaid",
      date: "Oct 24, 2023",
      unpaid: true,
    },
    {
      member: {
        name: "Sarah Jenkins",
        id: "#LB-3452",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      reason: "Design as Art",
      meta: "Damaged Page (Covered)",
      amount: "$5.50",
      status: "Paid",
      date: "Oct 22, 2023",
      unpaid: false,
    },
    {
      member: {
        name: "Michael Chen",
        id: "#LB-9012",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      reason: "Atomic Habits",
      meta: "Overdue (45 Days)",
      amount: "$45.00",
      status: "Unpaid",
      date: "Sep 15, 2023",
      unpaid: true,
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1280, mx: 'auto' }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6, flexWrap: 'wrap', gap: 4 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, letterSpacing: '-0.03em' }}>
            Fines & Payments
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
            Manage institutional revenue, outstanding balances, and penalty collections.
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
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.75rem'
          }}
        >
          New Fine Entry
        </Button>
      </Box>

      {/* Summary Metrics */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {[
          { label: "Total Outstanding", val: "$4,280.50", sub: "+12% vs last month", icon: <MoneyOffIcon />, color: "error" },
          { label: "Collected This Month", val: "$12,942.00", sub: "+5.4%", icon: <AccountBalanceWalletIcon />, color: "primary" },
          { label: "Restricted Members", val: "42", sub: "Action Required", icon: <GroupRemoveIcon />, color: "info" },
          { label: "Avg. Payment Time", val: "4.2 Days", sub: "Standard", icon: <ScheduleIcon />, color: "secondary" },
        ].map((metric, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <MetricCard elevation={0}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Avatar sx={{ bgcolor: `${metric.color}.main` + '11', color: `${metric.color}.main`, borderRadius: 4, width: 64, height: 64 }}>
                  {React.cloneElement(metric.icon as React.ReactElement, { sx: { fontSize: 32 } })}
                </Avatar>
                <Chip 
                  label={metric.sub} 
                  size="small" 
                  sx={{ 
                    borderRadius: 10, 
                    fontWeight: 900, 
                    fontSize: 10, 
                    bgcolor: `${metric.color}.main` + '11', 
                    color: `${metric.color}.main`,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }} 
                />
              </Box>
              <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', mb: 0.5 }}>
                {metric.label}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>{metric.val}</Typography>
            </MetricCard>
          </Grid>
        ))}
      </Grid>

      {/* Main Data Table */}
      <StyledTableContainer component={Paper} elevation={0}>
        <Box sx={{ p: 4, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 4, borderBottom: '1px solid #eceef0' }}>
          <Stack direction="row" spacing={4} alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Recent Transactions</Typography>
            <Stack direction="row" spacing={1.5}>
              <Chip label="All Fines" size="small" color="primary" sx={{ fontWeight: 900, px: 2, borderRadius: 3 }} />
              <Chip label="Paid" size="small" sx={{ fontWeight: 900, px: 2, borderRadius: 3, bgcolor: '#f2f4f6' }} />
              <Chip label="Unpaid" size="small" sx={{ fontWeight: 900, px: 2, borderRadius: 3, bgcolor: '#f2f4f6' }} />
            </Stack>
          </Stack>
          <Button
            variant="contained"
            startIcon={<FilterListIcon />}
            sx={{
              bgcolor: '#f2f4f6',
              color: 'text.primary',
              '&:hover': { bgcolor: '#e6e8ea' },
              boxShadow: 'none',
              borderRadius: 3,
              fontSize: 10,
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}
          >
            Advanced Filters
          </Button>
        </Box>

        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8f9fb' }}>
              <TableCell sx={{ fontSize: 10, fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', tracking: '0.15em', py: 3, px: 4 }}>Member</TableCell>
              <TableCell sx={{ fontSize: 10, fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', tracking: '0.15em', py: 3, px: 4 }}>Reason / Book</TableCell>
              <TableCell sx={{ fontSize: 10, fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', tracking: '0.15em', py: 3, px: 4 }}>Amount</TableCell>
              <TableCell sx={{ fontSize: 10, fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', tracking: '0.15em', py: 3, px: 4 }}>Status</TableCell>
              <TableCell sx={{ fontSize: 10, fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', tracking: '0.15em', py: 3, px: 4 }}>Transaction Date</TableCell>
              <TableCell align="right" sx={{ fontSize: 10, fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', tracking: '0.15em', py: 3, px: 4 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentFines.map((fine, i) => (
              <TableRow key={i} sx={{ '&:hover': { bgcolor: '#f8f9fb55' }, transition: 'background-color 0.2s' }}>
                <TableCell sx={{ py: 3, px: 4 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={fine.member.avatar} sx={{ width: 40, height: 40, border: `2px solid ${theme.palette.background.paper}` }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 900 }}>{fine.member.name}</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled', textTransform: 'uppercase', tracking: '0.1em' }}>ID: {fine.member.id}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell sx={{ py: 3, px: 4 }}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>{fine.reason}</Typography>
                    <Typography variant="caption" sx={{ fontWeight: 900, textTransform: 'uppercase', color: fine.unpaid ? 'error.main' : 'primary.main', tracking: '0.1em', mt: 0.5, display: 'block' }}>
                      {fine.meta}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 3, px: 4 }}>
                  <Typography variant="body2" sx={{ fontWeight: 900 }}>{fine.amount}</Typography>
                </TableCell>
                <TableCell sx={{ py: 3, px: 4 }}>
                  <Chip 
                    label={fine.status} 
                    size="small"
                    sx={{ 
                      borderRadius: 10, 
                      fontWeight: 900, 
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      bgcolor: fine.unpaid ? 'error.main' + '11' : 'primary.main' + '11',
                      color: fine.unpaid ? 'error.main' : 'primary.main',
                      '& .MuiChip-label': { px: 1.5 }
                    }} 
                    icon={<Box sx={{ w: 6, h: 6, borderRadius: '50%', bgcolor: fine.unpaid ? 'error.main' : 'primary.main', ml: 1 }} />}
                  />
                </TableCell>
                <TableCell sx={{ py: 3, px: 4 }}>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.secondary' }}>{fine.date}</Typography>
                </TableCell>
                <TableCell align="right" sx={{ py: 3, px: 4 }}>
                  {fine.unpaid ? (
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        px: 3,
                        py: 1,
                        borderRadius: 3,
                        fontSize: 10,
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        boxShadow: `0 4px 12px ${theme.palette.primary.main}44`
                      }}
                    >
                      Collect
                    </Button>
                  ) : (
                    <IconButton sx={{ bgcolor: '#f2f4f6', borderRadius: 3 }}>
                      <ReceiptLongIcon sx={{ fontSize: 20, color: 'text.disabled' }} />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ p: 4, bgcolor: '#f8f9fb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Showing 1 to 10 of 254 transactions
          </Typography>
          <Pagination count={26} shape="rounded" color="primary" />
        </Box>
      </StyledTableContainer>

      {/* Contextual Insights */}
      <Grid container spacing={4} sx={{ mt: 4, pb: 12 }}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 8, 
              borderRadius: 10, 
              background: 'linear-gradient(135deg, #006c46 0%, #004d32 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', mb: 3 }}>
                Automated Reminders
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, maxWidth: 480 }}>
                Our system automatically triggers push alerts and emails to members when fines exceed <Box component="span" sx={{ color: 'white', fontWeight: 900 }}>$10.00</Box>. Currently, <Box component="span" sx={{ color: 'white', fontWeight: 900 }}>84%</Box> of fines are settled within 48 hours.
              </Typography>
            </Box>
            <Stack direction="row" spacing={3} sx={{ position: 'relative', zIndex: 1, mt: 6 }}>
              <Button variant="contained" sx={{ bgcolor: 'white', color: 'primary.main', fontWeight: 900, borderRadius: 4, px: 4, '&:hover': { bgcolor: '#f2f4f6' } }}>Review Settings</Button>
              <Button variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)', fontWeight: 900, borderRadius: 4, px: 4, '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>View Analytics</Button>
            </Stack>
            <MailIcon sx={{ position: 'absolute', right: -64, bottom: -64, fontSize: 320, color: 'white', opacity: 0.05, transform: 'rotate(12deg)' }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 6, borderRadius: 10, borderLeft: `8px solid ${theme.palette.primary.main}`, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', mb: 6 }}>Payment Methods</Typography>
            <Stack spacing={4}>
              {[
                { label: "Card Payments", val: 70, icon: <CreditCardIcon />, color: "primary" },
                { label: "Cash (Desk)", val: 20, icon: <PaymentsIcon />, color: "info" },
                { label: "Digital Wallets", val: 10, icon: <SmartphoneIcon />, color: "secondary" },
              ].map((pm, idx) => (
                <Box key={idx}>
                  <Stack direction="row" spacing={2.5} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar sx={{ bgcolor: `${pm.color}.main` + '11', color: `${pm.color}.main`, borderRadius: 4, width: 48, height: 48 }}>
                      {pm.icon}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 900 }}>{pm.label}</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.disabled' }}>{pm.val}%</Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={pm.val} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4, 
                          bgcolor: '#f2f4f6',
                          '& .MuiLinearProgress-bar': { borderRadius: 4, bgcolor: `${pm.color}.main` }
                        }} 
                      />
                    </Box>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinesPage;
