import { Public_Sans, Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const publicSans = Public_Sans({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#006c46',
      light: '#00a76f',
      dark: '#00321f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#486174',
      light: '#b0cae0',
      dark: '#304a5c',
    },
    background: {
      default: '#f8f9fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#191c1e',
      secondary: '#3d4a41',
    },
    error: {
      main: '#ba1a1a',
    },
    divider: '#eceef0',
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontFamily: publicSans.style.fontFamily,
      fontWeight: 900,
    },
    h2: {
      fontFamily: publicSans.style.fontFamily,
      fontWeight: 800,
    },
    h3: {
      fontFamily: publicSans.style.fontFamily,
      fontWeight: 700,
    },
    h4: {
      fontFamily: publicSans.style.fontFamily,
      fontWeight: 700,
    },
    h5: {
      fontFamily: publicSans.style.fontFamily,
      fontWeight: 700,
    },
    h6: {
      fontFamily: publicSans.style.fontFamily,
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontWeight: 800,
          letterSpacing: '0.02em',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #006c46 0%, #00a76f 100%)',
          boxShadow: '0 4px 12px rgba(0, 108, 70, 0.2)',
          '&:hover': {
            background: 'linear-gradient(135deg, #005234 0%, #008f5d 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 4px 24px rgba(25, 28, 30, 0.04)',
          border: '1px solid #eceef0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 24,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            backgroundColor: '#f2f4f6',
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: '1px solid #006c4633',
            },
            '&.Mui-focused fieldset': {
              border: '1px solid #006c46',
            },
          },
        },
      },
    },
  },
});

export default theme;
