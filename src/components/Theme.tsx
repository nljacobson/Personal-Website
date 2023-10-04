import { createTheme } from '@mui/material/styles';
export  const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6984a5',
      dark: '#336a3e',
    },
    secondary: {
      main: '#666666',
      dark: '#474747',
    },
    error: {
      main: '#cc59d2',
      dark: '#8E3E93',
    },
    info: {
      main: '#0b032d',
      dark:'#f9f9f9',
    },
  },
  typography: {
    "fontFamily": "Helvetica",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  }
});