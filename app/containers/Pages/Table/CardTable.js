import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from 'dan-components/Tables/tableStyle-jss';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useHistory } from 'react-router-dom';
import config from '../../../config/config';
import Popup from '../../../components/Popup/Popup';

const CardTable = props => {
  const {
    classes, data, setIsDone, user
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [popup, setPopup] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const [label, setLabel] = useState('');
  const { baseApiUrl } = config;
  const history = useHistory();

  const deleteVideoData = async id => {
    try {
      const url = baseApiUrl + 'video/' + id;
      const response = await axios.delete(url, {
        params: {
          token: localStorage.getItem('token'),
        },
      });
      const { message } = response.data.data;
      setIsDone(false);
      enqueueSnackbar(message, {
        variant: 'success',
      });
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      const message = error.response
        ? error.response.data.message
        : error.message;
      enqueueSnackbar(message, {
        variant: 'error',
      });
    }
  };

  const deleteUserData = async id => {
    try {
      const url = baseApiUrl + 'user/' + id;
      const response = await axios.delete(url, {
        params: {
          token: localStorage.getItem('token'),
        },
      });
      const { message } = response.data.data;
      enqueueSnackbar(message, {
        variant: 'success',
      });
      history.push('/app/users');
    } catch (error) {
      const message = error.response ? error.response.data.message : error.message;
      enqueueSnackbar(message, {
        variant: 'error',
      });
    }
  };

  const deleteVideo = async (e, id, labelValue) => {
    e.preventDefault();
    // find the item
    setPopup(true);
    setDeletedId(id);
    setLabel(labelValue);
  };

  const handleDeleteTrue = async () => {
    setPopup(false);
    if (label === 'video') {
      await deleteVideoData(deletedId);
    } else {
      await deleteUserData(deletedId);
    }
  };

  const handleClose = async () => {
    setPopup(false);
  };

  const deleteUser = async (e, id) => {
    e.preventDefault();
    setPopup(true);
    setDeletedId(id);
    setLabel(label);
  };

  return (
    <Fragment>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title} style={{ width: '97%' }}>
          <Typography className={classes.title} variant="h6">
            {user.name + ' (' + user.username + ')'}
          </Typography>
        </div>
        <Button
          size="small"
          color="primary"
          onClick={e => {
            deleteUser(e, user.id, 'user');
          }}
        >
          <DeleteIcon />
        </Button>
      </Toolbar>
      <div className={classes.rootTable}>
        <Table className={classNames(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell padding="default">Video</TableCell>
              <TableCell>View Count</TableCell>
              <TableCell>Like Count</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.map(n => [
                <TableRow key={n.id}>
                  <TableCell>
                    <video width="200" height="120" controls>
                      <source src={n.originalVideo} type="video/mp4" />
                      <track default kind="captions" srcLang="en" src={n.originalVideo} />
                    </video>
                  </TableCell>
                  <TableCell padding="default">
                    {n.viewCount}
                  </TableCell>
                  <TableCell>{n.likeCount}</TableCell>

                  <TableCell>
                    {' '}
                    <Button onClick={e => { deleteVideo(e, n.id, 'video'); }}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ])
            ) : (
              <TableRow>
                <TableCell padding="default">
                                    no data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Popup handleDeleteTrue={handleDeleteTrue} popup={popup} handleClose={handleClose} />
    </Fragment>
  );
};

CardTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  setIsDone: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(CardTable);
