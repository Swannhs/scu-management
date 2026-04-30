'use client';
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Stack,
  IconButton,
  styled,
  useTheme
} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const ChartBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'height' && prop !== 'active' && prop !== 'colorType',
})<{ height: string; active?: boolean; colorType?: 'primary' | 'secondary' }>(({ theme, height, active, colorType }) => ({
  width: '100%',
  height: height,
  borderRadius: '4px 4px 0 0',
  transition: 'all 0.3s ease',
  backgroundColor: active 
    ? (colorType === 'secondary' ? theme.palette.secondary.main : theme.palette.primary.main)
    : (colorType === 'secondary' ? theme.palette.secondary.light + '44' : theme.palette.primary.light + '44'),
  '&:hover': {
    backgroundColor: colorType === 'secondary' ? theme.palette.secondary.main : theme.palette.primary.main,
  },
}));

const LibraryDashboard = () => {
  const theme = useTheme();
  const categories = [
    { name: "Science Fiction", percentage: 82 },
    { name: "Biography", percentage: 64 },
    { name: "Technology", percentage: 59 },
    { name: "Historical Fiction", percentage: 41 },
  ];

  const topMembers = [
    {
      name: "Sarah Jenkins",
      role: "Premium Member",
      books: 124,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rank: 1,
    },
    {
      name: "David Chen",
      role: "Faculty",
      books: 98,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rank: 2,
    },
    {
      name: "Elena Rodriguez",
      role: "Student",
      books: 85,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rank: 3,
    },
    {
      name: "Marcus Thorne",
      role: "Researcher",
      books: 77,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      rank: 4,
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, spaceY: 4 }}>
      {/* Hero Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 900, letterSpacing: '-0.02em', mb: 0.5 }}>
            Analytics Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time performance metrics and library health indicators.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Paper variant="outlined" sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 1, borderRadius: 3 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase' }}>
              Timeframe:
            </Typography>
            <Select
              variant="standard"
              defaultValue="Last 12 Months"
              disableUnderline
              sx={{ fontSize: '0.875rem', fontWeight: 700, color: 'primary.main' }}
            >
              <MenuItem value="Last 12 Months">Last 12 Months</MenuItem>
              <MenuItem value="Last Quarter">Last Quarter</MenuItem>
              <MenuItem value="Fiscal Year 2023">Fiscal Year 2023</MenuItem>
            </Select>
          </Paper>
          <Button
            variant="contained"
            disableElevation
            startIcon={<DownloadIcon />}
            sx={{
              bgcolor: theme.palette.primary.main + '11',
              color: 'primary.main',
              '&:hover': { bgcolor: theme.palette.primary.main + '22' }
            }}
          >
            Export PDF
          </Button>
        </Stack>
      </Box>

      {/* Bento Grid Layout */}
      <Grid container spacing={3}>
        {/* Main Bar Chart: Books Issued (8 cols) */}
        <Grid item xs={12} lg={8}>
          <StyledCard>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Books Issued Per Month
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Total volume compared across last 12 months
                  </Typography>
                </Box>
                <Stack direction="row" spacing={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ w: 12, h: 12, borderRadius: '50%', bgcolor: 'primary.main' }} />
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>PHYSICAL</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ w: 12, h: 12, borderRadius: '50%', bgcolor: 'secondary.main' }} />
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary' }}>DIGITAL</Typography>
                  </Box>
                </Stack>
              </Box>
              
              <Box sx={{ height: 256, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 1 }}>
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, idx) => (
                  <Box key={month} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, height: '100%' }}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column-reverse', gap: '2px', height: '100%' }}>
                      <ChartBar 
                        height={`${[60, 45, 75, 90, 65, 55, 80, 40, 85, 70, 50, 95][idx]}%`}
                        active={month === "Jul"}
                      />
                      <ChartBar 
                        height={`${[30, 40, 20, 10, 25, 35, 15, 50, 10, 20, 30, 5][idx]}%`}
                        active={month === "Jul"}
                        colorType="secondary"
                      />
                    </Box>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: month === "Jul" ? 'primary.main' : 'text.disabled' }}>
                      {month.toUpperCase()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Top Active Members (4 cols) */}
        <Grid item xs={12} lg={4}>
          <StyledCard>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>
                Top Members
              </Typography>
              <Stack spacing={4}>
                {topMembers.map((member) => (
                  <Box key={member.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ position: 'relative' }}>
                        <Avatar src={member.avatar} sx={{ width: 40, height: 40 }} />
                        <Box sx={{ 
                          position: 'absolute', 
                          bottom: -4, 
                          right: -4, 
                          width: 20, 
                          height: 20, 
                          bgcolor: member.rank === 1 ? 'primary.main' : 'primary.light',
                          border: `2px solid ${theme.palette.background.paper}`,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: 10,
                          fontWeight: 900
                        }}>
                          {member.rank}
                        </Box>
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 800 }}>{member.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{member.role}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ fontWeight: 900 }}>{member.books}</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase' }}>Books</Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Overdue Trends (6 cols) */}
        <Grid item xs={12} lg={6}>
          <StyledCard sx={{ position: 'relative', overflow: 'hidden' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Overdue Trends
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mb: 4, display: 'block' }}>
                Incident count over the last 30 days
              </Typography>
              <Box sx={{ position: 'relative', height: 192, mt: 2 }}>
                <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor={theme.palette.error.main} stopOpacity="0.2" />
                      <stop offset="100%" stopColor={theme.palette.error.main} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,80 Q50,70 100,85 T200,40 T300,60 T400,20 L400,100 L0,100 Z"
                    fill="url(#lineGrad)"
                  />
                  <path
                    d="M0,80 Q50,70 100,85 T200,40 T300,60 T400,20"
                    fill="none"
                    stroke={theme.palette.error.main}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled' }}>30 DAYS AGO</Typography>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.disabled' }}>TODAY</Typography>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Popular Book Categories (6 cols) */}
        <Grid item xs={12} lg={6}>
          <StyledCard>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>
                Popular Categories
              </Typography>
              <Stack spacing={3}>
                {categories.map((category) => (
                  <Box key={category.name}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>{category.name}</Typography>
                      <Typography variant="caption" sx={{ fontWeight: 900, color: 'primary.main' }}>{category.percentage}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={category.percentage} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        bgcolor: theme.palette.primary.main + '11',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                        }
                      }} 
                    />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LibraryDashboard;
