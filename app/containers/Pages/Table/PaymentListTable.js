import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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

const PaymentListTable = props => {
  const { classes, data } = props;

  return (
    <Fragment>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography className={classes.title} variant="h6">
                        Payment History
          </Typography>
        </div>
      </Toolbar>
      <div className={classes.rootTable}>
        <Table className={classNames(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell>Payment Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Crown</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>transaction ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data ? (
              data.map(n => [
                <TableRow key={n._id}>
                  <TableCell>{moment(new Date(n.createdAt)).format('MMM DD, YYYY')}</TableCell>
                  <TableCell>{n.userID ? n.userID.name : ''}</TableCell>
                  <TableCell>{n.userID ? n.userID.username : ''}</TableCell>
                  <TableCell>{n.crown}</TableCell>
                  <TableCell>{n.amount}</TableCell>
                  <TableCell>{n.transactionID}</TableCell>
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
    </Fragment>
  );
};

PaymentListTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

export default withStyles(styles)(PaymentListTable);
