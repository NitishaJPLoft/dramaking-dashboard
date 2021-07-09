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
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { useHistory } from 'react-router-dom';
import Popup from '../../../components/Popup/Popup';
import config from '../../../config/config';

const UserListTable = props => {
  const { classes, data, setIsDone } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [popup, setPopup] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const history = useHistory();
  const { baseApiUrl } = config;

  const approveUser = async (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const url = baseApiUrl + 'verification/approve';
    const response = await axios.post(
      url,
      {
        uid: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      setIsDone(false);
      enqueueSnackbar('Account is approved', {
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
  const deleteMe = async id => {
    try {
      const url = baseApiUrl + 'user/' + id;
      const response = await axios.delete(url, {
        params: {
          token: localStorage.getItem('token'),
        },
      });
      const { message } = response.data.data;
      setIsDone(false);
      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 3000
      });
    } catch (error) {
      const message = error.response ? error.response.data.message : error.message;
      enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 3000
      });
    }
  };
  const deleteUser = async (e, id) => {
    e.preventDefault();
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

  const seeVideos = async (e, id) => {
    e.preventDefault();
    const url = '/app/user/' + id + '/videos';
    history.push(url);
  };

  const seeDocs = async (e, id) => {
    e.preventDefault();
    const url = '/app/user/' + id + '/docs';
    history.push(url);
  };

  return (
    <Fragment>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography className={classes.title} variant="h6">
                        Users
          </Typography>
        </div>
      </Toolbar>
      <div className={classes.rootTable}>
        <Table className={classNames(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell width="10%">Name</TableCell>
              <TableCell width="13%">Username</TableCell>
              <TableCell width="10%">Image</TableCell>
              <TableCell width="18%">Email</TableCell>
              <TableCell width="15%">Mobile</TableCell>
              <TableCell width="12%">Documents</TableCell>
              <TableCell width="10%">Wallet</TableCell>
              <TableCell width="12%">Is Verified</TableCell>
              <TableCell width="8%">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.map(n => [
                <TableRow key={n._id}>
                  <TableCell>{n.name}</TableCell>
                  <TableCell>{n.username}</TableCell>
                  <TableCell>
                    <img src={n.image} height="60" width="60" alt="img" />
                  </TableCell>
                  <TableCell>{n.email}</TableCell>
                  <TableCell>{n.mobile}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>
                    {n.docCount ? (
                      <Button onClick={e => { seeDocs(e, n._id); }}>
                        {n.docCount}
                      </Button>
                    ) : 0}
                  </TableCell>
                  <TableCell>{n.wallet ? n.wallet.balance : 0}</TableCell>
                  <TableCell>
                    {n.isUserVerified ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell>
                    {' '}
                    <Button onClick={e => { deleteUser(e, n._id); }}>
                      {' '}
                      <DeleteIcon />
                    </Button>
                    <Button onClick={e => { approveUser(e, n._id); }}>
                      {' '}
                      <VerifiedUserIcon />
                    </Button>
                    <Button onClick={e => { seeVideos(e, n._id); }}>
                      {' '}
                      <VisibilityIcon />
                    </Button>
                  </TableCell>
                </TableRow>,
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

UserListTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  setIsDone: PropTypes.func.isRequired
};

export default withStyles(styles)(UserListTable);
