import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const OrderCards = () => {

  const filteredStatuses = ['Incoming', 'Preparing', 'Ready'];

  const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    margin: '8px',
    '&.date': {
      color: "#0000009e",
    },
    '&.status': {
      marginBottom: '10px',
      color: "#8F9297",
    },
  }));
  
  const [orders, setOrders] = useState([
    {
      id: 1,
      roomNo: '5',
      guestName: 'Yash',
      time: "5 minutes",
      items: [{ name: 'Paneer', quantity: 2 }],
      status: 'Preparing'
    },
    {
      id: 2,
      roomNo: '1',
      guestName: 'Arshad',
      time: "15 minutes",
      items: [{ name: 'Carrot', quantity: 2 }, { name: "Tomato", quantity: 5 }],
      status: 'Incoming'
    },
    {
      id: 3,
      roomNo: '8',
      guestName: 'Vickey',
      time: "5 minutes",
      items: [{ name: 'Potato', quantity: 2 }],
      status: 'Incoming'
    },
    {
      id: 4,
      roomNo: '3',
      guestName: 'Jatin',
      time: "5 minutes",
      items: [{ name: 'Onion', quantity: 12 }, { name: 'Cucumber', quantity: 29 }],
      status: 'Ready'
    },
    {
      id: 5,
      roomNo: '9',
      guestName: 'Dixit',
      time: "15 minutes",
      items: [{ name: 'Lettuce', quantity: 10 }, { name: 'Bell pepper', quantity: 5 }, { name: 'Broccoli', quantity: 2 }],
      status: 'Ready'
    },
    {
      id: 6,
      roomNo: '2',
      guestName: 'Rajdip',
      time: "5 minutes",
      items: [{ name: 'Cauliflower', quantity: 42 }, { name: 'Photato', quantity: 13 }],
      status: 'Ready'
    },
    {
      id: 7,
      roomNo: '44',
      guestName: 'Sahil',
      time: "5 minutes",
      items: [{ name: 'Lettuce', quantity: 42 }, { name: 'Photato', quantity: 3 }],
      status: 'Preparing'
    },
    {
      id: 8,
      roomNo: '2',
      guestName: 'Amit',
      time: "5 minutes",
      items: [{ name: 'Broccoli', quantity: 42 }],
      status: 'Preparing'
    },
    {
      id: 9,
      roomNo: '23',
      guestName: 'Rahul',
      time: "15 minutes",
      items: [{ name: 'Cauliflower', quantity: 42 }, { name: 'Photato', quantity: 13 }],
      status: 'Ready'
    }
  ]);

  const handleMarkAsDelivery = (orderId) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: 'archive' };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const ordersByStatus = orders.reduce((acc, order) => {
    if (!acc[order.status]) {
      acc[order.status] = { count: 0, orders: [] };
    }
    acc[order.status].count++;
    acc[order.status].orders.push(order);
    return acc;
  }, {});

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
     <Box sx={{ display: 'flex', alignItems: 'center', margin: '2px 18px' }}>
        <StyledTypography variant="h5">Today</StyledTypography>
        <StyledTypography variant="h6" className="date">({today})</StyledTypography>
        <FormControl component="fieldset" sx={{
          backgroundColor: '#F3F4F6', paddingRight: "12px", marginLeft: "6px",
          borderRadius: "18px"
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
      <Box sx={{
        display: 'flex', overflowX: 'auto',
        margin: "0 12px"
      }}>
        {filteredStatuses.map((status, columnIndex) => (
          <Box key={columnIndex} sx={{
            flex: 1,
            padding: '10px',
            overflowY: 'auto',
            height: "75vh",
            background: "#F3F4F6",
            borderRadius: "16px",
            margin: " 10px"
          }}>
            <StyledTypography variant="body1" className="status">
              {status}
              <Chip label={ordersByStatus[status]?.count || 0} style={{ marginLeft: "8px", color: 'white', background: "#9AA1AB" }} />
            </StyledTypography>
            {ordersByStatus[status]?.orders.map((order, index) => (
              <Card key={index} style={{ marginBottom: '20px' }}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Room No. {order.roomNo}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Guest Name: {order.guestName}
                  </Typography>
                  <Typography variant="body2" component="span" >
                    Items:
                    <Typography variant="body2" component="span" sx={{ marginLeft: "4px" }}>
                      {order.items.map((item, index) => (
                        <span key={index}>
                          {index > 0 && ", "}
                          {item.name}
                        </span>
                      ))}
                    </Typography>
                  </Typography>
                  <Typography sx={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
                    <Typography variant="body1" component="span" sx={{
                      border: "1px solid #0000009e",
                      borderRadius: "16px",
                      padding: "4px 12px"
                    }}>
                      Delivery in  <Typography component="span"
                        sx={{ color: order.time !== "5 minutes" ? "green" : "red" }}
                      >{order.time}</Typography>
                    </Typography>
                    {order.status === 'Ready' && (
                      <Button
                        variant="contained"
                        sx={{
                          color: "#5E85E0", backgroundColor: "white", boxShadow: "none", '&:hover': {
                            backgroundColor: "white",
                            boxShadow: "none",
                          }
                        }}
                        onClick={() => handleMarkAsDelivery(order.id)}
                      >
                        Mark as Delivery
                      </Button>
                    )}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default OrderCards;
