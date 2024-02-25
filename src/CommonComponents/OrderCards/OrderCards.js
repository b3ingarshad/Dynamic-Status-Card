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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const OrderCards = () => {

  const filteredStatuses = ['Incoming', 'Preparing', 'Ready'];

  const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    margin: '8px',
    '&.date': {
      color: "#0000009e",
    },
    '&.status': {
      marginBottom: '28px',
      color: "#8F9297",

    },
  }));

  const [orders, setOrders] = useState([
    {
      id: 1,
      number: "#1234",
      note: "Note Added",
      roomNo: '5',
      guestName: 'Yash',
      time: "5 minutes",
      items: [{ name: 'Paneer', quantity: 2 }],
      status: 'Preparing'
    },
    {
      id: 2,
      number: "#1234",
      note: "Note Added",
      roomNo: '1',
      guestName: 'Arshad',
      time: "15 minutes",
      items: [{ name: 'Carrot', quantity: 2 }, { name: "Tomato", quantity: 5 }],
      status: 'Incoming'
    },
    {
      id: 3,
      number: "#1234",
      note: "Note Added",
      roomNo: '8',
      guestName: 'Vickey',
      time: "5 minutes",
      items: [{ name: 'Potato', quantity: 2 }],
      status: 'Incoming'
    },
    {
      id: 4,
      number: "#1234",
      note: "Note Added",
      roomNo: '3',
      guestName: 'Jatin',
      time: "5 minutes",
      items: [{ name: 'Onion', quantity: 12 }, { name: 'Cucumber', quantity: 29 }],
      status: 'Ready'
    },
    {
      id: 5,
      number: "#1234",
      note: "Note Added",
      roomNo: '9',
      guestName: 'Dixit',
      time: "15 minutes",
      items: [{ name: 'Lettuce', quantity: 10 }, { name: 'Bell pepper', quantity: 5 }, { name: 'Broccoli', quantity: 2 }],
      status: 'Ready'
    },
    {
      id: 6,
      number: "#1234",
      note: "Note Added",
      roomNo: '2',
      guestName: 'Rajdip',
      time: "5 minutes",
      items: [{ name: 'Cauliflower', quantity: 42 }, { name: 'Photato', quantity: 13 }],
      status: 'Ready'
    },
    {
      id: 7,
      number: "#1234",
      note: "Note Added",
      roomNo: '44',
      guestName: 'Sahil',
      time: "5 minutes",
      items: [{ name: 'Lettuce', quantity: 42 }, { name: 'Photato', quantity: 3 }],
      status: 'Preparing'
    },
    {
      id: 8,
      number: "#1234",
      note: "Note Added",
      roomNo: '2',
      guestName: 'Amit',
      time: "5 minutes",
      items: [{ name: 'Broccoli', quantity: 42 }],
      status: 'Preparing'
    },
    {
      id: 9,
      number: "#1234",
      note: "Note Added",
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

  const [anchorEl, setAnchorEl] = useState(new Array(orders.length).fill(null));

  const handleMenuOpen = (event, index) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = event.currentTarget;
    setAnchorEl(newAnchorEl);
  };

  const handleMenuClose = (index) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = null;
    setAnchorEl(newAnchorEl);
  };

  const handleAction = (index, action) => {
    handleMenuClose(index);
  };

  const onDragEnd = (result) => {
    console.log(result, "result");
    if (!result.destination) {
      return;
    }

    const sourceStatus = filteredStatuses[result.source.droppableId];
    const destinationStatus = filteredStatuses[result.destination.droppableId];

    if (sourceStatus === destinationStatus) {
      return;
    }

    const updatedOrders = [...orders];
    const [removed] = updatedOrders[sourceStatus].splice(result.source.index, 1);
    updatedOrders[destinationStatus].splice(result.destination.index, 0, removed);

    setOrders(updatedOrders);
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
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

        <Box sx={{
          display: 'flex', overflowX: 'auto',
          margin: "0 12px"
        }}>
          {filteredStatuses.map((status, columnIndex) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
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
                    <Draggable key={order.id} draggableId={`order - ${order.id}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card
                            key={index}
                            style={{
                              marginBottom: '20px', border: "1px solid #E5E7EB",
                              boxShadow: "0px 1px 2px 0px #00000014"
                            }}>
                            <CardContent sx={{ padding: "14px 8px 16px 16px" }}>
                              <Typography style={{ display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="h5" component="span" sx={{
                                  fontSize: "16px",
                                  color: "#374151",
                                  fontWeight: "500"
                                }} >
                                  Room No. {order.roomNo}
                                </Typography>

                                <Typography component="span" >
                                  <Typography component="span" sx={{
                                    fontSize: "12px",
                                    fontWeight: "400",
                                    color: "#6B7280"
                                  }}>
                                    {order.number}
                                  </Typography>
                                  <IconButton
                                    sx={{ padding: "0" }}
                                    aria-label="more"
                                    aria-controls={`actions - menu - ${index}`}
                                    aria-haspopup="true"
                                    onClick={(event) => handleMenuOpen(event, index)}
                                  >
                                    <MoreVertIcon />
                                  </IconButton>
                                  <Menu
                                    id={`actions - menu - ${index}`}
                                    anchorEl={anchorEl[index]}
                                    open={Boolean(anchorEl[index])}
                                    onClose={() => handleMenuClose(index)}
                                  >
                                    {/* Add MenuItem for each action */}
                                    <MenuItem onClick={() => handleAction(index, 'action1')}>Action 1</MenuItem>
                                    <MenuItem onClick={() => handleAction(index, 'action2')}>Action 2</MenuItem>
                                    {/* Add more MenuItems for additional actions */}
                                  </Menu>
                                </Typography>
                              </Typography>
                              <Typography variant="body1" component="p" sx={{
                                fontSize: "12px",
                                fontWeight: "400",
                                color: "#6B7280"
                              }}>
                                Guest Name: {order.guestName}
                              </Typography>
                              <Typography variant="body2" sx={{
                                display: "flex",
                                justifyContent: "space-between"
                              }} >
                                <Typography variant="body2" component="span" sx={{
                                  fontSize: "12px",
                                  fontWeight: "400",
                                  color: "#6B7280",
                                  paddingTop: "10px"
                                }} >
                                  Items:
                                  <Typography variant="body2" component="span" sx={{ fontSize: "12px", marginLeft: "4px" }}>
                                    {order.items.map((item, index) => (
                                      <span key={index}>
                                        {index > 0 && ", "}
                                        {item.name}
                                      </span>
                                    ))}
                                  </Typography>
                                </Typography>
                                <Chip label={order.note} sx={{ color: "#6B7280", padding: "0" }} />
                              </Typography>
                              <Typography sx={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
                                <Typography variant="body1" component="span" sx={{
                                  border: "1px solid #E5E7EB",
                                  borderRadius: "16px",
                                  padding: "4px 12px",
                                  fontSize: "12px",
                                  color: "#374151"
                                }}>
                                  Delivery in  <Typography component="span"
                                    sx={{ fontSize: "12px", color: order.time !== "5 minutes" ? "green" : "red" }}
                                  >{order.time}</Typography>
                                </Typography>
                                {order.status === 'Ready' && (
                                  <Button
                                    variant="contained"
                                    sx={{
                                      textTransform: "none",
                                      padding: "0 20px",
                                      color: "#1C64F2", backgroundColor: "white", boxShadow: "none", '&:hover': {
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
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable >
          ))}
        </Box >
      </DragDropContext >
    </>
  );
};

export default OrderCards;