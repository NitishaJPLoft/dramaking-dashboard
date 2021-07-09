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
import axios from 'axios';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import Dropzone from '../Dropzone/Dropzone';
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

export default function CreateMusic() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { baseApiUrl } = config;
  const title = brand.name + ' - profile';
  const description = brand.desc;
  const [songName, setSongName] = useState('');
  const [singer, setSinger] = useState('');
  const [thumbnail, setThumbnail] = useState([]);
  const [url, setUrl] = useState([]);

  const handleChange1 = event => {
    const targetName = event.target.name;
    switch (targetName) {
      case 'songName':
        setSongName(event.target.value);
        break;
      case 'singer':
        setSinger(event.target.value);
        break;
      case 'thumbnail':
        setThumbnail(event.target.value);
        break;
      case 'url':
        setUrl(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addMusic = async data => {
    try {
      const formData = new FormData();
      formData.append('singer', data.singer);
      formData.append('songName', data.songName);
      formData.append('url', data.url[0]);
      formData.append('thumbnail', data.thumbnail[0]);
      const urlData = baseApiUrl + 'music';
      const response = await axios.post(urlData, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: '*/*',
          'Access-Control-Allow-Origin': '*'
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response ? error.response.data.message : error.message;
    }
  };

  const formSubmit = async e => {
    e.preventDefault();
    const data = {
      singer,
      songName,
      url,
      thumbnail
    };
    const response = await addMusic(data);

    if (response.status && response.status === 200) {
      enqueueSnackbar('Music created', {
        variant: 'success',
        autoHideDuration: 3000
      });
      history.push('/app/music');
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
      <PapperBlock title="Music" desc="Add Music">
        <AppBar position="static" color="transparent">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="fullWidth"
          >
            <Tab label="Music Info" {...a11yProps(0)} />
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
              <InputLabel htmlFor="songName">Song Name</InputLabel>
              <Input
                id="songName"
                value={songName || ''}
                name="songName"
                onChange={handleChange1}
              />
            </FormControl>

            <FormControl style={{ width: '48%' }}>
              <InputLabel htmlFor="singer">Singer Name</InputLabel>
              <Input
                id="singer"
                value={singer || ''}
                name="singer"
                onChange={handleChange1}
              />
            </FormControl>

            <Dropzone acceptType="audio/*" files={url} setFiles={setUrl} title="Upload Song" caption="Drag 'n' drop audio files here, or click to select audio files " />

            <Dropzone acceptType="image/*" files={thumbnail} setFiles={setThumbnail} title="Thumbnail" caption="Drag 'n' drop image files here, or click to select image files " />

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
