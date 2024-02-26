import React, { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';

const CommonCard = ({ index, order, handleMarkAsDelivery  }) => {

    const [anchorEl, setAnchorEl] = useState(new Array(order?.length).fill(null));

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
    
    return (
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
                            {order?.roomNo}
                        </Typography>

                        <Typography component="span" >
                            <Typography component="span" sx={{
                                fontSize: "12px",
                                fontWeight: "400",
                                color: "#6B7280"
                            }}>
                                {order?.number}
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
                                <MenuItem onClick={() => handleAction(index, 'action1')}>Action 1</MenuItem>
                                <MenuItem onClick={() => handleAction(index, 'action2')}>Action 2</MenuItem>
                            
                            </Menu>
                        </Typography>
                    </Typography>
                    <Typography variant="body1" component="p" sx={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#6B7280"
                    }}>
                        {order?.guestName}
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
                                {order?.items.map((item, index) => (
                                    <span key={index}>
                                        {index > 0 && ", "}
                                        {item.name}
                                    </span>
                                ))}
                            </Typography>
                        </Typography>
                        <Chip label={order?.note} sx={{ color: "#6B7280", padding: "0" }} />
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
                                sx={{ fontSize: "12px", color: order?.time !== "5 minutes" ? "green" : "red" }}
                            >{order?.time}</Typography>
                        </Typography>
                        {order?.status === 'Ready' && (
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
                                onClick={() => handleMarkAsDelivery(order?.id)}
                            >
                                Mark as Delivery
                            </Button>
                        )}
                    </Typography>
                </CardContent>
            </Card>
    )
}
export default CommonCard