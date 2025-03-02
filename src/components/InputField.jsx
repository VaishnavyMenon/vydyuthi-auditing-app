import React from 'react';
import { 
  TextField,  
  Autocomplete,
  InputLabel,
} from '@mui/material';

const ReusableInputField = ({ 
  variant = 'text', 
  label, 
  options = [], 
  multiline = false, 
  rows = 4, 
  value = '', 
  onChange, 
  error,
  helperText,
  ...props 
}) => {
  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderColor: '#AABFAB', // Border color
      height: variant !== 'multiline' ? '50px' : 'auto', // Height of the text field
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

  // For standard text or number input
  if (variant === 'text' || variant === 'number') {
    return (
      <TextField
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        fullWidth
        variant="outlined"
        multiline={multiline}
        rows={multiline ? rows : 1}
        type={variant === 'number' ? 'number' : 'text'}
        sx={inputStyles}
        error={error}
        helperText={helperText}
        {...props}
      />
    );
  }
  
  // For multiline text areas
  if (variant === 'multiline') {
    return (
      <TextField
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        fullWidth
        variant="outlined"
        multiline
        rows={rows}
        sx={inputStyles}
        error={error}
        helperText={helperText}
        {...props}
      />
    );
  }

  // For dropdown with free text entry (combobox)
  if (variant === 'dropdown') {
    return (
      <Autocomplete
        freeSolo
        options={options}
        value={value || ''}
        onChange={(event, newValue) => onChange(newValue || '')}
        onInputChange={(event, newInputValue) => {
          if (event && event.type === 'change') {
            onChange(newInputValue || '');
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            fullWidth
            variant="outlined"
            error={error}
            helperText={helperText}
            sx={inputStyles}
          />
        )}
        {...props}
      />
    );
  }


  return null;
};

export default ReusableInputField;