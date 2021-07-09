import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
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

const MusicListTable = props => {
  const { classes, data, setIsDone } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [popup, setPopup] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const { baseApiUrl } = config;

  const deleteMe = async id => {
    try {
      const url = baseApiUrl + 'music/' + id;
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
  const deleteMusic = async (e, id) => {
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
                        Musics
          </Typography>
        </div>
      </Toolbar>
      <div className={classes.rootTable}>
        <Table className={classNames(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell padding="default" width="15%">Singer</TableCell>
              <TableCell width="15%">Song Name</TableCell>
              <TableCell width="13%">Thumbnail</TableCell>
              <TableCell width="20%">Url</TableCell>
              <TableCell width="15%">User</TableCell>
              <TableCell width="12%">Video</TableCell>
              <TableCell width="10%">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.map(n => [
                <TableRow key={n.id}>
                  <TableCell padding="default">
                    {n.singer}
                  </TableCell>
                  <TableCell>{n.songName}</TableCell>
                  <TableCell>
                    <img src={n.thumbnail} alt="img" height="60" width="60" />
                  </TableCell>
                  <TableCell>
                    <audio controls>
                      <source src={n.url} type="audio/mp3" />
                      <track default kind="captions" srcLang="en" src={n.url} />
                    </audio>
                  </TableCell>
                  <TableCell>{n.user && n.user.username ? n.user.username : 'N/A'}</TableCell>
                  <TableCell>
                    {n.video && n.video.thumbnails ? <img src={n.video.thumbnails} alt="img" height="60" width="60" /> : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {' '}
                    <Button onClick={e => { deleteMusic(e, n.id); }}>
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

MusicListTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  setIsDone: PropTypes.func.isRequired
};

export default withStyles(styles)(MusicListTable);
