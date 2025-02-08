import React from 'react';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a custom theme with typography styles
const theme = createTheme({
  typography: {
    subtitle: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 300, // Light weight
      fontSize: '16px',
      color: '#888888',
    },
    title: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 700, // Bold weight
      fontSize: '36px',
      color: '#539F58',
      paddingTop:"3px",
      minWidth:"350px"
    },
    description: {
      fontFamily: 'Lato, sans-serif',
      fontWeight: 400, // Regular weight
      fontSize: '14px',
      color: '#AAAAAA',
      paddingTop:"3px"

    },
  },
});

const Text = ({ variant, children, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <Typography variant={variant} sx={{ ...theme.typography[variant] }} {...props}>
        {children}
      </Typography>
    </ThemeProvider>
  );
};

export default Text;
