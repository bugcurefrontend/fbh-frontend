import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#003399',
      light: '#4d79cc',
      dark: '#002266',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#19212c',
      light: '#4a5259',
      dark: '#0f1419',
      contrastText: '#ffffff'
    },
    success: {
      main: '#206f32',
      light: '#4d8f5b',
      dark: '#164d22',
      contrastText: '#ffffff'
    },
    text: {
      primary: '#090c0f',
      secondary: '#454950'
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff'
    },
    grey: {
      100: '#f5f5f5',
      200: '#e4e4e4',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#0f172a'
    },
    divider: '#d1d5db'
  },
  typography: {
    fontFamily: '"Public Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '4rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h4: {
      fontFamily: '"Public Sans", sans-serif',
      fontSize: '1.125rem',
      fontWeight: 700,
      lineHeight: 1.4
    },
    h5: {
      fontFamily: '"Public Sans", sans-serif',
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.5
    },
    h6: {
      fontFamily: '"Public Sans", sans-serif',
      fontSize: '0.875rem',
      fontWeight: 700,
      lineHeight: 1.5
    },
    body1: {
      fontFamily: '"Public Sans", sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5
    },
    body2: {
      fontFamily: '"Public Sans", sans-serif',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5
    },
    button: {
      fontFamily: '"Public Sans", sans-serif',
      fontSize: '0.875rem',
      fontWeight: 700,
      textTransform: 'uppercase'
    },
    caption: {
      fontFamily: '"Public Sans", sans-serif',
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.4
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 700
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 8px rgba(0, 51, 153, 0.3)'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          border: '1px solid #e4e4e4',
          boxShadow: '0px 1px 2px rgba(133, 133, 133, 0.30)'
        }
      }
    }
  }
});

export default theme;