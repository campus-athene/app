import { createTheme } from '@mui/material';

const muiTheme = createTheme({
  palette: {
    // These colors are also defined in tailwind.config.js
    primary: {
      main: '#27143C',
      contrastText: '#F0F0F0',
    },
    secondary: {
      main: '#FFB800',
      contrastText: '#000000',
    },
  },
});

export default muiTheme;
