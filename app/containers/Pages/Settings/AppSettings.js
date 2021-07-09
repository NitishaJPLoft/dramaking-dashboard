import React, {
  useEffect, useState, useCallback, Fragment
} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import { Button } from '@material-ui/core';
import config from '../../../config/config';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

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
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  submit: {
    justifyContent: 'center',
    marginTop: 30,
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { baseApiUrl } = config;
  const [isDone, setIsDone] = useState(false);
  const title = brand.name + ' - profile';
  const description = brand.desc;
  const [userID, setUserID] = useState('');
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [mname, setMname] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');

  const handleChange1 = event => {
    // setName(event.target.value);

    const targetName = event.target.name;

    switch (targetName) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'fname':
        setFname(event.target.value);
        break;
      case 'mname':
        setMname(event.target.value);
        break;
      case 'lname':
        setLname(event.target.value);
        break;
      case 'mobile':
        setMobile(event.target.value);
        break;
      case 'username':
        setUsername(event.target.value);
        break;
      default:
        break;
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const formSubmit = async e => {
    e.preventDefault();
  };

  const getProfile = useCallback(async () => {
    try {
      const url = baseApiUrl + 'user/me';
      const response = await axios.get(url, {
        params: {
          token: localStorage.getItem('token'),
        },
      });

      console.log(response.data);
      const result = response.data.data.info;
      setUserID(result.id);
      setFname(result.fname);
      setMname(result.mname);
      setLname(result.lname);
      setEmail(result.email);
      setMobile(result.mobile);
      setUsername(result.username);
      setIsDone(true);
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      // return error.response ? error.response.data : error.message;
    }
  }, [setIsDone]);

  useEffect(() => {
    if (!isDone) {
      getProfile();
    }
  }, [isDone]);

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock title="Settings" desc="View/Edit App Settings">
        <AppBar position="static" color="transparent">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="fullWidth"
          >
            <Tab label="App Settings" {...a11yProps(0)} />
            <Tab label="Language Setting" {...a11yProps(1)} />
            <Tab label="Theme setting" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={formSubmit}
          >
            <FormControl disabled>
              <InputLabel htmlFor="component-disabled">
                                ID
              </InputLabel>
              <Input
                id="component-disabled"
                value={userID || ''}
                multiline
                onChange={handleChange1}
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="fname">First Name</InputLabel>
              <Input
                id="fname"
                value={fname || ''}
                name="fname"
                onChange={handleChange1}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="mname">Middle Name</InputLabel>
              <Input
                id="mname"
                value={mname || ''}
                name="mname"
                onChange={handleChange1}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="lname">Last Name</InputLabel>
              <Input
                id="lname"
                value={lname || ''}
                name="lname"
                onChange={handleChange1}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                value={email || ''}
                onChange={handleChange1}
                name="email"
              />
            </FormControl>

            <FormControl>
              <InputLabel htmlFor="mobile">Mobile</InputLabel>
              <Input
                id="mobile"
                value={mobile || ''}
                name="mobile"
                onChange={handleChange1}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                value={username || ''}
                name="username"
                onChange={handleChange1}
              />
            </FormControl>

            <div className={classes.submit}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
              >
                Submit
              </Button>
            </div>
          </form>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Change Profile Image
        </TabPanel>
        <TabPanel value={value} index={2}>
          Change Password
        </TabPanel>
      </PapperBlock>
    </Fragment>
  );
}
