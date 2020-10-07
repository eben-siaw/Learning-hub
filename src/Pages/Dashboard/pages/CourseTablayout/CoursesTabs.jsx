import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography'; 
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import Share from '../../../InstructorPage/Lessons/Share';
import Guidelines from '../../../InstructorPage/Lessons/Guidelines';
import UploadVideo from '../../../InstructorPage/Videos/UploadVideo';
import SharedLessons from '../../../InstructorPage/Lessons/SharedLessons'; 
import UploadIcon from '@material-ui/icons/CloudUpload'; 
import ShareIcon from '@material-ui/icons/Share'; 
import ListIcon from '@material-ui/icons/List'; 
import GuidelinesIcon from '@material-ui/icons/ViewAgenda';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0.4, 
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CoursesTabs(props) { 
  
 const {meetingId} = props.match.params;

  const classes = useStyles(); 
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue); 
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <div className={classes.root}> 
       <div className="mobile-box">
      <AppBar position="static" color="transparent">
        <Tabs value={value}  
        onChange={handleChange}  
        aria-label="simple tabs example"  
        variant="scrollable"  
        textColor="primary"
        scrollButtons="auto"
        centered>
          <Tab  label="Upload Videos" icon={<UploadIcon />} {...a11yProps(0)} />
          <Tab  label="Share materials" icon={<ShareIcon /> } {...a11yProps(1)} /> 
          <Tab  label="Shared lessons" icon={<ListIcon />} {...a11yProps(2) } />
          <Tab  label="Guidelines" icon={<GuidelinesIcon/>} {...a11yProps(3)} />
        </Tabs>
      </AppBar> 
      <TabPanel value={value} index={0}>
        <UploadVideo />
      </TabPanel>
      <TabPanel value={value} index={1}>
       <Share meetingId={meetingId} />
      </TabPanel> 
      <TabPanel value={value} index={2}>
       <SharedLessons />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Guidelines/>
      </TabPanel>  
      </div>   
       <style jsx>{` 
          @media (max-width: 500px) {
          .mobile-box {
            height: 76vh;
            overflow: auto; 
            margin-right: 35px;
          } 
        } `}</style>
    </div> 
  );
}