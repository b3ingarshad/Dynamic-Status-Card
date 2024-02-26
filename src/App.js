import React, { useState } from 'react';
import Box from '@mui/material/Box';
import OrderCards from './CommonComponents/OrderCards/OrderCards';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { StyledTypography } from './CommonComponents/OrderCards/StyledTypography';

function App() {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
    return formattedDate;
  };

  const today = formatDate(new Date());

  const [showArchive, setShowArchive] = useState(false);
  const handleToggle = () => {
    setShowArchive(prevState => !prevState);
  };

  return (
    <>
      <Box component="section" sx={{ p: 2, fontWeight: '500', fontSize: '24px' }}>
        Orders & Requests
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', margin: '2px 18px' }}>
        <StyledTypography variant="h5" sx={{ color: "#374151" }} >Today</StyledTypography>
        <StyledTypography variant="h6" className="date" sx={{ fontSize: "24px", marginLeft: "0" }}>({today})</StyledTypography>
        <FormControl component="fieldset" sx={{
          backgroundColor: '#F3F4F6', paddingRight: "12px", marginLeft: "6px",
          borderRadius: "18px", color: "#374151"
        }}>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="start"
              control={<Switch checked={showArchive} onChange={handleToggle} />}
              label="Accepting Orders"
              labelPlacement="start"
            />
          </FormGroup>
        </FormControl>
      </Box>
      <OrderCards />
    </>
  );
}

export default App;
