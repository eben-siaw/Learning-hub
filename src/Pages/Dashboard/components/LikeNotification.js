import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications'; 
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'; 
import Avatar  from "@material-ui/core/Avatar";
import {useSelector} from 'react-redux';  
import axios from 'axios';

const URL = "https://nilee-nodedatabase.herokuapp.com"; 

const local = "http://localhost:5050"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));


 function NotificationMenu() { 

  const classes = useStyles();  

  const user = useSelector(state => state.auth.user._id);

  const [anchorEl, setAnchorEl] = React.useState(null); 

  const [selectedIndex, setSelectedIndex] = React.useState(1); 

  const [notificationcount, setNotificationcount] = useState(0);
   
 const [isVisible, setisVisible] = useState(false);

  const [notifications, setNotifications] = useState([]); 

  const getNotifications = async () => { 
    
    try { 
      return await axios.get(URL + `/like/getNotifications/${user}`) 
      .then(response => { 
       if(response.data.success) { 
         setNotifications(response.data.notification);   
         setNotificationcount(response.data.notification.length);
         console.log("getNotifications", response.data);  
       } else { 
         alert("No new notification");
       }
      }) 
    } catch (error) {
       console.log(error);
    }
   
  } 
 
  useEffect(() => { 
    getNotifications();   
  }); 
  

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget); 
    toast("You may have notifications!")
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton 
       onClick={handleClickListItem} 
       component="nav" aria-label="Device settings">
        <Badge badgeContent={notificationcount} color="secondary">
        <NotificationsIcon className="m-view"/>
        </Badge>
      </IconButton> 
      <ToastContainer/> 
     <div className={classes.root}> 
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notifications.map((lists, index) => (
          <MenuItem
            key={lists}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            <Avatar>E</Avatar> {lists.sender.first_name} {lists.sender.last_name} liked your video
          </MenuItem>
        ))}
      </Menu> 
      </div>
    </div>
  );
}

export default NotificationMenu;