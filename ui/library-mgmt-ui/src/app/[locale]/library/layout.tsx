'use client';
import React from "react";
import { Box, Typography, Paper, styled, useTheme } from "@mui/material";
import LibrarySidebar from "@/components/LibrarySidebar";
import LibraryHeader from "@/components/LibraryHeader";

const LayoutRoot = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  display: 'flex',
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  marginLeft: 256, // matches Sidebar width
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

const FloatingIndicator = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 32,
  right: 32,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1.5, 2),
  borderRadius: 16,
  boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
  border: '1px solid #eceef0',
  zIndex: 1300,
  backgroundColor: theme.palette.background.paper,
}));

const StatusDot = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0 0 8px ${theme.palette.primary.main}88`,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: 'inherit',
    animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
    opacity: 0.75,
  },
  '@keyframes ping': {
    '75%, 100%': {
      transform: 'scale(2.5)',
      opacity: 0,
    },
  },
}));

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <LayoutRoot>
      <LibrarySidebar />
      <MainContent>
        <LibraryHeader />
        <Box component="main" sx={{ flex: 1 }}>
          {children}
        </Box>
      </MainContent>
      
      {/* Floating Action State Indicator */}
      <FloatingIndicator elevation={0}>
        <StatusDot />
        <Typography variant="caption" sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Live System Feed
        </Typography>
      </FloatingIndicator>
    </LayoutRoot>
  );
}
