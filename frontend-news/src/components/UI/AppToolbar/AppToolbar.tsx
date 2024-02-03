import React from 'react';
import {AppBar, Toolbar, Typography} from '@mui/material';

const AppToolbar: React.FC = () => {
  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          News
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;