import React from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const ReusableInputField = ({ 
  variant = 'text', 
  label, 
  options = [], 
  multiline = false, 
  rows = 4,
  value = '',
  onChange,
  ...props 
}) => {

  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };
  
  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderColor: '#AABFAB', // Border color
      height: '50px', // Height of the text field
      borderRadius: '10px', // Border radius
      bgcolor: '#FFFFFF', // Background color
    },
    '& .MuiInputLabel-root': {
      color: '#999999', // Label color
    },
    '& .MuiOutlinedInput-input': {
      padding: '14px 14px', // Adjust padding to center the text in the field
    },
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid #AABFAB', // Border color before input focus
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#AABFAB', // Border color when the field is focused
    },
    '& .MuiInputBase-input::placeholder': {
      color: '#999999', // Placeholder text color
    },
    '& .MuiSelect-icon': {
      color: '#999999', // Dropdown arrow color
    },
  };

  // Render different types of input fields based on the variant
  if (variant === 'dropdown') {
    return (
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value || ''}
          onChange={handleChange}
          {...props}
          label={label}
          sx={inputStyles}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  return (
    <TextField
      value={value || ''}
      onChange={handleChange}
      {...props}
      label={label}
      fullWidth
      variant="outlined"
      multiline={multiline}
      rows={multiline ? rows : 1}
      type={variant === 'number' ? 'number' : 'text'}
      sx={inputStyles}
    />
  );
};

export default ReusableInputField;
