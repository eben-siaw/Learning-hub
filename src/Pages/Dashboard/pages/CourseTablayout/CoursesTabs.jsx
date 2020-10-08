import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom"; 
import UploadVideo from '../../../InstructorPage/Videos/UploadVideo'; 
import Share from '../../../InstructorPage/Lessons/Share';
import Guidelines from '../../../InstructorPage/Lessons/Guidelines';
import SharedLessons from '../../../InstructorPage/Lessons/SharedLessons';  
import UploadIcon from '@material-ui/icons/CloudUpload'; 
import ShareIcon from '@material-ui/icons/Share'; 
import ListIcon from '@material-ui/icons/List'; 
import GuidelinesIcon from '@material-ui/icons/ViewAgenda';
import HomeIcon from '@material-ui/icons/Home';  
import {createBrowserHistory} from "history"
import NotificationIcon from '@material-ui/icons/NotificationsActive';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  }, 
  space : { 
    flex: 1
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function CourseTabs(props) { 

  const { container } = props;   
 
  const {meetingId} = props.match.params;

  const history = createBrowserHistory();

  const classes = useStyles(); 

  const theme = useTheme(); 
 
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }; 

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index); 

  };
 
  const handleEvent = () => { 
     window.location = "/dashboard/instructorhub";
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider /> 

      <List 
      >
      <ListItem
            button   
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
            component={Link} 
            exact={true}
            to={`/courseview/${meetingId}/upload`}
          >  
          <ListItemIcon>   
          <UploadIcon color="primary"/> 
          </ListItemIcon >   
            <ListItemText>Upload Videos</ListItemText>
          </ListItem> 

          <ListItem
            button 
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            component={Link}
            to={`/courseview/${meetingId}/share`}
          >  
         <ListItemIcon>   
          <ShareIcon color="primary"/> 
          </ListItemIcon>   
            <ListItemText>Share Materials</ListItemText> 
          </ListItem> 

          <ListItem  
            component={Link}
            to={`/courseview/${meetingId}/lessons`} 
            button 
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)} >  
            <ListItemIcon>   
            <ListIcon color="primary"/> 
            </ListItemIcon>   
            <ListItemText>My Lessons</ListItemText>
          </ListItem>  

          <ListItem  
            component={Link}
            to={`/courseview/${meetingId}/guides`}
           button 
           selected={selectedIndex === 3}
           onClick={(event) => handleListItemClick(event, 3)}
           >  
           <ListItemIcon>   
           <GuidelinesIcon color="primary"/> 
           </ListItemIcon>   
            <ListItemText>Guidelines</ListItemText>
          </ListItem> 

      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.space}>
            Edunal
          </Typography> 
   
          <IconButton  
           component={Link} 
           to="/dashboard/instructorhub"
           color="inherit"> 
           <HomeIcon /> 
             </IconButton> 
            
             <IconButton color="inherit">  
             <NotificationIcon />   
             </IconButton> 

        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>

        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
           <Route exact path="/courseview/:meetingId/upload" component={UploadVideo} />
           <Route path="/courseview/:meetingId/share" component={Share} /> 
           <Route path="/courseview/:meetingId/lessons" component={SharedLessons} />
           <Route path="/courseview/:meetingId/guides" component={Guidelines} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

CourseTabs.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(
    typeof Element === "undefined" ? Object : Element
  )
};

export default CourseTabs;