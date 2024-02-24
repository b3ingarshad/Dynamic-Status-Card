import * as React from 'react';
import Box from '@mui/material/Box';
import OrderCards from './CommonComponents/OrderCards/OrderCards';

function App() {
  return (
    <>
      <Box component="section" sx={{ p: 2, fontWeight: 'bold', fontSize: '1.5rem' }}>
        Orders & Requests
      </Box>
      <OrderCards />
    </>
  );
}

export default App;
