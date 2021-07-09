import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from 'dan-components/Tables/tableStyle-jss';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import config from '../../../config/config';
import Popup from '../../../components/Popup/Popup';

const CardDocTable = props => {
  const {
    classes, data, setIsDone, user
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { baseApiUrl } = config;
  const [popup, setPopup] = useState(false);
  const [deletedId, setDeletedId] = useState();

  const deleteDocData = async id => {
    try {
      const url = baseApiUrl + 'verification/' + id;
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
  const deleteDocument = async (e, id) => {
    e.preventDefault();
    // find the item
    setPopup(true);
    setDeletedId(id);
  };

  const handleDeleteTrue = async () => {
    setPopup(false);
    await deleteDocData(deletedId);
  };

  const handleClose = async () => {
    setPopup(false);
  };

  return (
    <Fragment>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography className={classes.title} variant="h6">
            {user.name}
            {' '}
            Documents
          </Typography>
        </div>
      </Toolbar>
      <div className={classes.rootTable}>
        <Table className={classNames(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell padding="default">Document</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.map(n => [
                <TableRow key={n.id}>
                  <TableCell>
                    <img width="200" height="120" src={n.document} alt="doc" />
                  </TableCell>
                  <TableCell padding="default">
                    {n.type}
                  </TableCell>
                  <TableCell>
                    {' '}
                    <Button onClick={e => { deleteDocument(e, n.id); }}>
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

CardDocTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  setIsDone: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(CardDocTable);
