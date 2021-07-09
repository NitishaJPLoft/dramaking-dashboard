import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ResetForm } from 'dan-components';
import { useSnackbar } from 'notistack';
import styles from '../../../components/Forms/user-jss';

const ResetPassword = props => {
  const { enqueueSnackbar } = useSnackbar();
  const title = brand.name + ' - Reset Password';
  const description = brand.desc;
  const { classes } = props;
  const submitForm = values => {
    setTimeout(() => {
            console.log(`You submitted:\n\n${values}`); // eslint-disable-line
    }, 500); // simulate server latency

    enqueueSnackbar('Password changed successfully', {
      variant: 'success',
    });
  };

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <ResetForm onSubmit={values => submitForm(values)} />
        </div>
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetPassword);
