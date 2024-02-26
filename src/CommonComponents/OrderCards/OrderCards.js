import React, { useState } from 'react';
import Card from "./Card";
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { StyledTypography } from './StyledTypography';

const OrderCards = () => {
  
  const filteredStatuses = ['Incoming', 'Preparing', 'Ready'];

  const [orders, setOrders] = useState([
    {
      id: 1,
      number: "#1234",
      note: "Note Added",
      roomNo: 'Room No. 5',
      guestName: 'Guest Name: Yash',
      time: "5 minutes",
      items: [{ name: 'Paneer', quantity: 2 }],
      status: 'Preparing'
    },
    {
      id: 2,
      number: "#1234",
      note: "Note Added",
      roomNo: 'Room No. 1',
      guestName: 'Guest Name: Arshad',
      time: "15 minutes",
      items: [{ name: 'Carrot', quantity: 2 }, { name: "Tomato", quantity: 5 }],
      status: 'Incoming'
    },
    {
      id: 3,
      number: "#1234",
      note: "Note Added",
      roomNo: 'Room No. 8',
      guestName: 'Guest Name: Vickey',
      time: "5 minutes",
      items: [{ name: 'Potato', quantity: 2 }],
      status: 'Incoming'
    },
    {
      id: 4,
      number: "#1234",
      note: "Note Added",
      roomNo: 'Room No. 3',
      guestName: 'Guest Name: Jatin',
      time: "5 minutes",
      items: [{ name: 'Onion', quantity: 12 }, { name: 'Cucumber', quantity: 29 }],
      status: 'Ready'
    },
    {
      id: 5,
      number: "#1234",
      note: "Note Added",
      roomNo: 'Room No. 9',
      guestName: 'Guest Name: Dixit',
      time: "15 minutes",
      items: [{ name: 'Lettuce', quantity: 10 }, { name: 'Bell pepper', quantity: 5 }, { name: 'Broccoli', quantity: 2 }],
      status: 'Ready'
    },
    {
      id: 6,
      number: "#1234",
      note: "Note Added",
      roomNo: 'Room No. 2',
      guestName: 'Guest Name: Rajdip',
      time: "5 minutes",
      items: [{ name: 'Cauliflower', quantity: 42 }, { name: 'Photato', quantity: 13 }],
      status: 'Ready'
    },
    {
      id: 7,
      number: "#1234",
      note: "Note Added",
      roomNo: 'Room No. 44',
      guestName: 'Guest Name: Sahil',
      time: "5 minutes",
      items: [{ name: 'Lettuce', quantity: 42 }, { name: 'Photato', quantity: 3 }],
      status: 'Preparing'
    },
    {
      id: 8,
      number: "#1234",
      note: "Note Added",
      roomNo: 'Room No. 2',
      guestName: 'Guest Name: Amit',
      time: "5 minutes",
      items: [{ name: 'Broccoli', quantity: 42 }],
      status: 'Preparing'
    },
    {
      id: 9,
      number: "#1234",
      note: "Note Added",
      roomNo: 'Room No. 23',
      guestName: 'Guest Name: Rahul',
      time: "15 minutes",
      items: [{ name: 'Cauliflower', quantity: 42 }, { name: 'Photato', quantity: 13 }],
      status: 'Ready'
    }
  ]);

  const ordersByStatus = orders.reduce((acc, order) => {
    if (!acc[order.status]) {
      acc[order.status] = { count: 0, orders: [] };
    }
    acc[order.status].count++;
    acc[order.status].orders.push(order);
    return acc;
  }, {});

  return (
    <>
      <Box sx={{
        display: 'flex', overflowX: 'auto',
        margin: "0 12px"
      }}>
        {filteredStatuses.map((status, columnIndex) => (

          <Box
            key={columnIndex}
            sx={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              height: "75vh",
              background: "#F3F4F6",
              borderRadius: "16px",
              margin: " 10px"
            }}>
            <StyledTypography variant="body1" className="status" sx={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#6B7280"
            }}>
              {status}
              <Chip label={ordersByStatus[status]?.count || 0} style={{ height: "16px", marginLeft: "8px", color: 'white', background: "#9AA1AB" }} />
            </StyledTypography>
            {ordersByStatus[status]?.orders.map((order, index) => (
              <>
                <Card
                  index={index}
                  order={order}
                  setOrders={setOrders}
                />
              </>
            ))}
          </Box>


        ))}
      </Box >

    </>
  );
};

export default OrderCards;