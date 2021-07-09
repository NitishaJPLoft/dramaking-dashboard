import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from 'dan-components/Tables/tableStyle-jss';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import Popup from '../../../components/Popup/Popup';
import config from '../../../config/config';

const VideoListTable = props => {
  const { classes, data, setIsDone } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [popup, setPopup] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const { baseApiUrl } = config;

  const deleteMe = async id => {
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
      const message = error.response
        ? error.response.data.message
        : error.message;
      enqueueSnackbar(message, {
        variant: 'error',
      });
    }
  };
  const deleteVideo = async (e, id) => {
    e.preventDefault();
    // find the item
    setPopup(true);
    setDeletedId(id);
  };

  const handleDeleteTrue = async () => {
    setPopup(false);
    await deleteMe(deletedId);
  };

  const handleClose = async () => {
    setPopup(false);
  };

  return (
    <Fragment>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography className={classes.title} variant="h6">
                        Videos
          </Typography>
        </div>
      </Toolbar>
      <div className={classes.rootTable}>
        <Table className={classNames(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell padding="default">Posted BY</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Video</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.map(n => [
                <TableRow key={n._id}>
                  <TableCell padding="default">
                    <Link style={{ textDecoration: 'none' }} to={{ pathname: '/app/search/' + n.postedByUser.username }}>{n.postedByUser.name}</Link>
                  </TableCell>
                  <TableCell>
                    <Link style={{ textDecoration: 'none' }} to={{ pathname: '/app/search/' + n.postedByUser.username }}>{n.postedByUser.username}</Link>
                  </TableCell>
                  <TableCell>
                    <video width="200" height="120" controls>
                      <source src={n.originalVideo} type="video/mp4" />
                      <track default kind="captions" srcLang="en" src={n.originalVideo} />
                    </video>
                  </TableCell>
                  <TableCell>
                    {' '}
                    <Button onClick={e => { deleteVideo(e, n._id); }}>
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

VideoListTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  setIsDone: PropTypes.func.isRequired
};

export default withStyles(styles)(VideoListTable);
