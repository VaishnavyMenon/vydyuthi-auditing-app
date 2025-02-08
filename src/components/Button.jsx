import React from 'react';
import { Button } from '@mui/material';

const ButtonComponent = ({ variant = 'primary', children, ...props }) => {
  const getVariant = (variant) => {
    switch (variant) {
      case 'secondary':
        return 'outlined'; // secondary button is outlined
      case 'primary':
      default:
        return 'contained'; // primary button is contained
    }
  };

  return (
    <Button
      variant={getVariant(variant)}
      sx={{
        bgcolor: variant === 'primary' ? '#539F58' : '#ffffff',
        border: '1px solid #539F58',
        fontFamily: 'Lato, sans-serif',
        fontSize: '18px',
        padding: '20px',
        width:"100%",
        lineHeight:"14px",
        color: variant === 'primary' ? '#ffffff' : '#539F58',
        textTransform : 'none',
        '&:hover': {
          bgcolor: variant === 'primary' ? '#467a46' : '#f0f0f0', 
        },
        '&:disabled': {
          bgcolor: '#f0f0f0',
          color: '#999999',
          border: '1px solid #999999',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
