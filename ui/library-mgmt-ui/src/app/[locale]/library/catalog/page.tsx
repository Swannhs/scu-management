'use client';
import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Chip,
  Stack,
  IconButton,
  InputAdornment,
  Grid,
  styled,
  useTheme
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import InventoryIcon from '@mui/icons-material/Inventory';
import OutboxIcon from '@mui/icons-material/Outbox';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 24,
  boxShadow: '0 4px 24px rgba(25, 28, 30, 0.04)',
  border: '1px solid #eceef0',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper,
}));

const FilterPaper = styled(Paper)(({ theme }) => ({
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

const CatalogPage = () => {
  const theme = useTheme();
  const books = [
    {
      id: 1,
      title: "The Grid System in Architecture",
      author: "Josef Müller-Brockmann",
      isbn: "978-3721201451",
      category: "Architecture",
      copies: "12/15",
      status: "Available",
      cover: "https://images.unsplash.com/photo-1544434153-44c3c399720d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      title: "Artificial Intelligence: A Modern Approach",
      author: "Stuart Russell, Peter Norvig",
      isbn: "978-0136042594",
      category: "CS & AI",
      copies: "0/8",
      status: "Out",
      cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      title: "Astrophysics for People in a Hurry",
      author: Neil deGrasse Tyson,
      isbn: "978-0393609394",
      category: "Physics",
      copies: "4/5",
      status: "Available",
      cover: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 4,
      title: "Design as Art",
      author: "Bruno Munari",
      isbn: "978-0141035819",
      category: "Modern Art",
      copies: "22/22",
      status: "Available",
      cover: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1280, mx: 'auto' }}>
      {/* Page Title */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5, letterSpacing: '-0.02em' }}>
            Book Catalog
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and monitor the university's physical collection.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          sx={{
            bgcolor: '#f2f4f6',
            color: 'text.primary',
            '&:hover': { bgcolor: '#e6e8ea' },
            boxShadow: 'none',
            borderRadius: 3
          }}
        >
          Export CSV
        </Button>
      </Box>

      {/* Filters Bar */}
      <FilterPaper elevation={0}>
        <TextField
          placeholder="Search books by title, author or ISBN..."
          variant="outlined"
          fullWidth
          sx={{ flex: 1, minWidth: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" spacing={2}>
          <Select
            defaultValue="All Categories"
            sx={{ minWidth: 160, bgcolor: '#f2f4f6', borderRadius: 4, '& fieldset': { border: 'none' } }}
          >
            <MenuItem value="All Categories">All Categories</MenuItem>
            <MenuItem value="Computer Science">Computer Science</MenuItem>
            <MenuItem value="Architecture">Architecture</MenuItem>
            <MenuItem value="Physics">Physics</MenuItem>
          </Select>
          <Select
            defaultValue="Status: All"
            sx={{ minWidth: 160, bgcolor: '#f2f4f6', borderRadius: 4, '& fieldset': { border: 'none' } }}
          >
            <MenuItem value="Status: All">Status: All</MenuItem>
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Out of Stock">Out of Stock</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ px: 4, borderRadius: 4 }}
          >
            Add Book
          </Button>
        </Stack>
      </FilterPaper>

      {/* Table Card */}
      <StyledTableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f8f9fb' }}>
              <TableCell sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase' }}>Cover</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase' }}>Title & Author</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase' }}>ISBN</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase' }}>Category</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase' }}>Copies</TableCell>
              <TableCell sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontSize: 11, fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id} sx={{ '&:hover': { bgcolor: '#f8f9fb' }, transition: 'background-color 0.2s' }}>
                <TableCell>
                  <Box 
                    component="img" 
                    src={book.cover} 
                    sx={{ width: 48, height: 64, borderRadius: 1, objectCover: 'cover', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }} 
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>{book.title}</Typography>
                  <Typography variant="caption" color="text.secondary">{book.author}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{book.isbn}</Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={book.category} 
                    size="small" 
                    sx={{ borderRadius: 1, fontWeight: 700, bgcolor: '#f2f4f6', color: 'text.secondary' }} 
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>{book.copies}</Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={book.status} 
                    size="small"
                    sx={{ 
                      borderRadius: 10, 
                      fontWeight: 900, 
                      fontSize: 10,
                      bgcolor: book.status === 'Available' ? 'primary.main' + '11' : 'warning.main' + '11',
                      color: book.status === 'Available' ? 'primary.main' : 'warning.main',
                    }} 
                  />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton size="small" color="primary" sx={{ bgcolor: 'primary.main' + '11' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" sx={{ bgcolor: 'error.main' + '11' }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eceef0' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
            Showing 1-10 of 1,240 books
          </Typography>
          <Pagination count={124} shape="rounded" color="primary" size="small" />
        </Box>
      </StyledTableContainer>

      {/* Footer Summary */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {[
          { label: "Total Collection", val: "4,821", icon: <InventoryIcon />, color: 'primary' },
          { label: "Currently Loaned", val: "632", icon: <OutboxIcon />, color: 'warning' },
          { label: "Overdue Items", val: "18", icon: <EventBusyIcon />, color: 'error' },
        ].map((item, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Paper variant="outlined" sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3, borderRadius: 5 }}>
              <Avatar sx={{ bgcolor: `${item.color}.main` + '11', color: `${item.color}.main`, width: 56, height: 56 }}>
                {item.icon}
              </Avatar>
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 900, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.label}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>{item.val}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CatalogPage;
