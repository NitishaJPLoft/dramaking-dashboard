import React, {
  useState, Fragment
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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
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
      margin: theme.spacing(1)
    }
  },
  submit: {
    justifyContent: 'center',
    marginTop: 30,
  }
}));

export default function CreateCrown() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { baseApiUrl } = config;
  const title = brand.name + ' - profile';
  const description = brand.desc;
  const [crown, setCrown] = useState('');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [platform, setPlatform] = useState('');
  const [packageId, setPackageId] = useState('');

  const handleChange1 = event => {
    const targetName = event.target.name;
    switch (targetName) {
      case 'crown':
        setCrown(event.target.value);
        break;
      case 'desc':
        setDesc(event.target.value);
        break;
      case 'amount':
        setAmount(event.target.value);
        break;
      case 'platform':
        setPlatform(event.target.value);
        break;
      case 'packageId':
        setPackageId(event.target.value);
        break;
      default:
        break;
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const createCrown = async data => {
    try {
      const url = baseApiUrl + 'crown';
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
      crown,
      description: desc,
      amount,
      platform,
      packageId
    };
    const response = await createCrown(data);
    if (response.status && response.status === 200) {
      enqueueSnackbar('Crown created', {
        variant: 'success',
        autoHideDuration: 3000
      });
      history.push('/app/crowns');
    } else {
      enqueueSnackbar(response, {
        variant: 'error',
        autoHideDuration: 3000
      });
    }
  };

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
      <PapperBlock title="Crown" desc="Create Crown">
        <AppBar position="static" color="transparent">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="fullWidth"
          >
            <Tab label="Crowns" {...a11yProps(0)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={formSubmit}
          >

            <FormControl style={{ width: '48%' }}>
              <InputLabel htmlFor="crown">Crown</InputLabel>
              <Input
                id="crown"
                value={crown}
                name="crown"
                type="number"
                onChange={handleChange1}
              />
            </FormControl>
            <FormControl style={{ width: '48%' }}>
              <InputLabel htmlFor="amount">Amount</InputLabel>
              <Input
                id="amount"
                value={amount}
                name="amount"
                type="number"
                onChange={handleChange1}
              />
            </FormControl>

            <FormControl style={{ width: '48%' }}>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input
                id="description"
                value={desc}
                name="desc"
                onChange={handleChange1}
              />
            </FormControl>
            <FormControl style={{ width: '48%' }}>
              <InputLabel id="demo-simple-select-label">Platform</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="platform"
                name="platform"
                value={platform}
                onChange={handleChange1}
              >
                <MenuItem value="android">Android</MenuItem>
                <MenuItem value="ios">IOS</MenuItem>
              </Select>
            </FormControl>
            {platform && platform === 'ios' ? (
              <FormControl style={{ width: '48%' }}>
                <InputLabel htmlFor="amount">PackageId</InputLabel>
                <Input
                  id="packageId"
                  value={packageId}
                  name="packageId"
                  type="text"
                  onChange={handleChange1}
                />
              </FormControl>
            ) : ''}

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
