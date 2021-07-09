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

const CrownListTable = props => {
  const { classes, data, setIsDone } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [popup, setPopup] = useState(false);
  const [deletedId, setDeletedId] = useState();
  const { baseApiUrl } = config;

  const deleteCrown = async id => {
    try {
      const url = baseApiUrl + 'crown/' + id;
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
  const deleteCrownData = async (e, id) => {
    e.preventDefault();
    setPopup(true);
    setDeletedId(id);
  };

  const handleDeleteTrue = async () => {
    setPopup(false);
    await deleteCrown(deletedId);
  };

  const handleClose = async () => {
    setPopup(false);
  };

  return (
    <Fragment>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography className={classes.title} variant="h6">
            Crowns
          </Typography>
        </div>
      </Toolbar>
      <div className={classes.rootTable}>
        <Table className={classNames(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell width="10%">Crown</TableCell>
              <TableCell width="13%">Description</TableCell>
              <TableCell width="10%">Amount</TableCell>
              <TableCell width="10%">Platform</TableCell>
              <TableCell width="10%">Package ID</TableCell>
              <TableCell width="8%">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.map(n => [
                <TableRow key={n._id}>
                  <TableCell>{n.crown}</TableCell>
                  <TableCell>{n.description}</TableCell>
                  <TableCell>{n.amount}</TableCell>
                  <TableCell>{n.platform}</TableCell>
                  <TableCell>{n.packageId}</TableCell>
                  <TableCell>
                    {' '}
                    <Button onClick={e => { deleteCrownData(e, n.id); }}>
                      {' '}
                      <DeleteIcon />
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

CrownListTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  setIsDone: PropTypes.func.isRequired
};

export default withStyles(styles)(CrownListTable);
