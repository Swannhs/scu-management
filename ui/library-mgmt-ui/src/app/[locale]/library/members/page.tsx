'use client';
import React from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Stack,
  Select,
  MenuItem,
  Grid,
  IconButton,
  styled,
  useTheme
} from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 24,
  boxShadow: '0 4px 24px rgba(25, 28, 30, 0.04)',
  border: '1px solid #eceef0',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
}));

const ControlPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 20,
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  boxShadow: '0 4px 24px rgba(25, 28, 30, 0.04)',
  border: '1px solid #eceef0',
}));

const MembersPage = () => {
  const theme = useTheme();
  const members = [
    {
      name: "Arjun Sharma",
      email: "arjun.sharma@edu.com",
      id: "STU-88219",
      role: "Student",
      department: "Computer Science",
      booksIssued: "04",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Sarah Jenkins",
      email: "s.jenkins@faculty.edu",
      id: "TCH-44102",
      role: "Teacher",
      department: "Business",
      booksIssued: "12",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Michael Vance",
      email: "m.vance@edu.com",
      id: "STU-11928",
      role: "Student",
      department: "Engineering",
      booksIssued: "01",
      status: "Blocked",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Elena Lopez",
      email: "elena.l@edu.com",
      id: "STU-90211",
      role: "Student",
      department: "Computer Science",
      booksIssued: "00",
      status: "Active",
      initials: "EL",
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1280, mx: 'auto' }}>
      {/* Page Title & Primary Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5, letterSpacing: '-0.02em' }}>
            Member Directory
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and track 2,450 academic community members.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          sx={{
            background: 'linear-gradient(135deg, #006c46 0%, #00a76f 100%)',
            boxShadow: '0 8px 16px rgba(0, 108, 70, 0.2)',
            px: 4,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 800
          }}
        >
          New Entry
        </Button>
      </Box>

      {/* Control Bar (Filters) */}
      <ControlPaper elevation={0}>
        <Stack direction="row" spacing={2} sx={{ flex: 1, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1, bgcolor: '#f2f4f6', borderRadius: 3 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase' }}>Role</Typography>
            <Select
              variant="standard"
              defaultValue="All Roles"
              disableUnderline
              sx={{ fontSize: '0.875rem', fontWeight: 700 }}
            >
              <MenuItem value="All Roles">All Roles</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1, bgcolor: '#f2f4f6', borderRadius: 3 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', textTransform: 'uppercase' }}>Department</Typography>
            <Select
              variant="standard"
              defaultValue="All Departments"
              disableUnderline
              sx={{ fontSize: '0.875rem', fontWeight: 700 }}
            >
              <MenuItem value="All Departments">All Departments</MenuItem>
              <MenuItem value="Computer Science">Computer Science</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="Engineering">Engineering</MenuItem>
            </Select>
          </Box>
        </Stack>
        <Button
          variant="text"
          startIcon={<FilterListIcon />}
          sx={{ fontWeight: 800, color: 'primary.main', '&:hover': { bgcolor: 'primary.main' + '11' } }}
        >
          More Filters
        </Button>
      </ControlPaper>

      {/* Data Table Module */}
      <StyledTableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8f9fb' }}>
              <TableCell sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', tracking: '0.05em' }}>Member</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', tracking: '0.05em' }}>ID</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', tracking: '0.05em' }}>Role</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', tracking: '0.05em' }}>Department</TableCell>
              <TableCell align="center" sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', tracking: '0.05em' }}>Books Issued</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', tracking: '0.05em' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', tracking: '0.05em' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id} sx={{ '&:hover': { bgcolor: '#f8f9fb' }, transition: 'background-color 0.2s' }}>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar 
                      src={member.avatar} 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        bgcolor: 'primary.main' + '11', 
                        color: 'primary.main',
                        fontWeight: 900,
                        fontSize: 14
                      }}
                    >
                      {member.initials}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>{member.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{member.email}</Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontWeight: 600 }}>{member.id}</Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={member.role} 
                    size="small" 
                    sx={{ 
                      borderRadius: 1.5, 
                      fontWeight: 900, 
                      fontSize: 10,
                      textTransform: 'uppercase',
                      bgcolor: member.role === 'Student' ? '#e3f2fd' : '#f3e5f5',
                      color: member.role === 'Student' ? '#1976d2' : '#7b1fa2'
                    }} 
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{member.department}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>{member.booksIssued}</Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      bgcolor: member.status === 'Active' ? 'primary.main' : 'error.main',
                      boxShadow: member.status === 'Active' ? `0 0 8px ${theme.palette.primary.main}88` : `0 0 8px ${theme.palette.error.main}88`
                    }} />
                    <Typography variant="caption" sx={{ fontWeight: 800, color: member.status === 'Active' ? 'primary.main' : 'error.main' }}>
                      {member.status}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton size="small" color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'text.disabled' }}>
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eceef0' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
            Showing 1-10 of 2,450 members
          </Typography>
          <Pagination count={245} shape="rounded" color="primary" size="small" />
        </Box>
      </StyledTableContainer>

      {/* Contextual Insight Cards */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 5 }}>
            <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' + '11', color: 'primary.main', borderRadius: 3, width: 48, height: 48 }}>
                <GroupAddIcon />
              </Avatar>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase' }}>New Members</Typography>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>+128</Typography>
              </Box>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              Increasing by 12% compared to last semester's average.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 5 }}>
            <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 2 }}>
              <Avatar sx={{ bgcolor: 'info.main' + '11', color: 'info.main', borderRadius: 3, width: 48, height: 48 }}>
                <SchoolIcon />
              </Avatar>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase' }}>Active Ratio</Typography>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>94.2%</Typography>
              </Box>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              Member retention remains high across all departments.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 3, 
              borderRadius: 5, 
              borderLeft: `6px solid ${theme.palette.primary.main}`,
              bgcolor: theme.palette.primary.main + '05'
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 900, color: 'primary.main', textTransform: 'uppercase', mb: 1, display: 'block' }}>Quick Tip</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 1.5, lineHeight: 1.5 }}>
              Bulk update member roles by selecting multiple rows in the directory view.
            </Typography>
            <Button variant="text" size="small" sx={{ fontWeight: 900, fontSize: 10, p: 0, minWidth: 0 }}>LEARN MORE</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MembersPage;
