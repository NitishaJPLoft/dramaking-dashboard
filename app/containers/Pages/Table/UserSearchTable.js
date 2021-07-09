import React, { Fragment, useState, useEffect } from 'react';
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
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

const UserSearchTable = props => {
  const { classes, data } = props;
  const [users, setUsers] = useState(data);
  const [isDone, setIsDone] = useState(false);
  const history = useHistory();
  const showVideos = async id => {
    const url = '/app/user/' + id + '/videos';
    history.push(url);
  };
  const getVideos = async (e, id) => {
    e.preventDefault();

    await showVideos(id);
  };

  useEffect(() => {
    if (!isDone && data.length >= 1) {
      setUsers(data);
      // setIsDone(true);
    }
  }, [isDone, data, setUsers, setIsDone]);
  return (
    <Fragment>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography className={classes.title} variant="h6">
                        users
          </Typography>
        </div>
      </Toolbar>
      <div className={classes.rootTable}>
        {users.length > 0 ? (
          <Table
            className={classNames(classes.table, classes.stripped)}
          >
            <TableHead>
              <TableRow>
                <TableCell width="10%">Name</TableCell>
                <TableCell width="13%">Username</TableCell>
                <TableCell width="10%">Image</TableCell>
                <TableCell width="18%">Email</TableCell>
                <TableCell width="15%">Mobile</TableCell>
                <TableCell width="10%">Wallet</TableCell>
                <TableCell width="8%">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users ? (
                users.map(n => [
                  <TableRow key={n._id || n.id}>
                    <TableCell>{n.name}</TableCell>
                    <TableCell>{n.username}</TableCell>
                    <TableCell>
                      <img src={n.image} height="60" width="60" alt="img" />
                    </TableCell>
                    <TableCell>{n.email}</TableCell>
                    <TableCell>{n.mobile}</TableCell>
                    <TableCell>{n.wallet ? n.wallet.balance : 0}</TableCell>
                    <TableCell>
                      <Button onClick={e => { getVideos(e, n._id); }}>
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
        ) : (
          <Grid container justify="center">
            <Grid item>No data found</Grid>
          </Grid>
        )}
      </div>
    </Fragment>
  );
};

UserSearchTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(UserSearchTable);
