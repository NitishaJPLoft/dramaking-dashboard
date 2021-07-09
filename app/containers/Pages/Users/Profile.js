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
import { useSnackbar } from 'notistack';
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
  const { enqueueSnackbar } = useSnackbar();
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
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
      case 'password':
        setPassword(event.target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(event.target.value);
        break;
      default:
        break;
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateProfile = async data => {
    try {
      const url = baseApiUrl + 'user/me';
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response ? error.response.data.message : error.message;
    }
  };

  const formSubmit = async e => {
    e.preventDefault();

    const data = {
      fname,
      mname,
      lname,
      email,
      mobile,
      username,
      action: 'admin'
    };

    const response = await updateProfile(data);

    if (response.status && response.status === 200) {
      // login
      enqueueSnackbar('Profile updated', {
        variant: 'success',
        autoHideDuration: 3000
      });
    } else {
      enqueueSnackbar(response, {
        variant: 'error',
        autoHideDuration: 3000
      });
    }
  };

  const changePassword = async e => {
    e.preventDefault();

    if (password === confirmPassword) {
      const data = {
        password,
        action: 'changePassword'
      };

      const response = await updateProfile(data);

      if (response.status && response.status === 200) {
        // login
        enqueueSnackbar('Password Changed', {
          variant: 'success',
          autoHideDuration: 3000
        });
      } else {
        enqueueSnackbar(response, {
          variant: 'error',
          autoHideDuration: 3000
        });
      }
    } else {
      enqueueSnackbar('Confirm Password is not same as Password', {
        variant: 'error',
        autoHideDuration: 3000
      });
    }
  };

  const getProfile = useCallback(async () => {
    try {
      const url = baseApiUrl + 'user/me';
      const response = await axios.get(url, {
        params: {
          token: localStorage.getItem('token'),
        },
      });

      const result = response.data.data.info;
      setUserID(result.id);
      setFname(result.firstName);
      setMname(result.middleName);
      setLname(result.lastName);
      setEmail(result.email);
      setMobile(result.mobile);
      setUsername(result.username);
      setIsDone(true);
    } catch (error) {
      return error.response ? error.response.data : error.message;
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
      <PapperBlock title="Profile" desc="View/Edit Profile">
        <AppBar position="static" color="transparent">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="fullWidth"
          >
            <Tab label="Profile" {...a11yProps(0)} />
            {/* <Tab label="Change Profile Image" {...a11yProps(1)} /> */}
            <Tab label="Change Password" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={formSubmit}
          >
            <FormControl style={{ width: '48%' }} disabled>
              <InputLabel htmlFor="component-disabled">
                                ID
              </InputLabel>
              <Input
                id="component-disabled"
                value={userID || ''}
                onChange={handleChange1}
              />
            </FormControl>

            <FormControl style={{ width: '48%' }}>
              <InputLabel htmlFor="fname">First Name</InputLabel>
              <Input
                id="fname"
                value={fname || ''}
                name="fname"
                onChange={handleChange1}
              />
            </FormControl>
            <FormControl style={{ width: '48%' }}>
              <InputLabel htmlFor="mname">Middle Name</InputLabel>
              <Input
                id="mname"
                value={mname || ''}
                name="mname"
                onChange={handleChange1}
              />
            </FormControl>
            <FormControl style={{ width: '48%' }}>
              <InputLabel htmlFor="lname">Last Name</InputLabel>
              <Input
                id="lname"
                value={lname || ''}
                name="lname"
                onChange={handleChange1}
              />
            </FormControl>
            <FormControl style={{ width: '48%' }}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                value={email || ''}
                onChange={handleChange1}
                name="email"
              />
            </FormControl>

            <FormControl style={{ width: '48%' }}>
              <InputLabel htmlFor="mobile">Mobile</InputLabel>
              <Input
                id="mobile"
                value={mobile || ''}
                name="mobile"
                onChange={handleChange1}
              />
            </FormControl>
            <FormControl style={{ width: '48%' }}>
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
        {/* <TabPanel value={value} index={1}>
                    Change Profile Image
                </TabPanel> */}
        <TabPanel value={value} index={1}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={changePassword}
          >
            <FormControl style={{ width: '48%' }}>
              <InputLabel htmlFor="password">New Password</InputLabel>
              <Input
                id="password"
                value={password || ''}
                name="password"
                type="password"
                onChange={handleChange1}
              />
            </FormControl>
            <FormControl style={{ width: '48%' }}>
              <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
              <Input
                id="confirmPassword"
                value={confirmPassword || ''}
                name="confirmPassword"
                type="password"
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
      </PapperBlock>
    </Fragment>
  );
}
