import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';

// validation functions
const required = value => (value == null ? 'Required' : undefined);

class ResetForm extends React.Component {
  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      deco,
    } = this.props;
    return (
      <Paper
        className={classNames(classes.paperWrap, deco && classes.petal)}
      >
        <div className={classes.topBar}>
          <NavLink to="/" className={classes.brand}>
            <img src={logo} alt={brand.name} />
            {brand.name}
          </NavLink>
        </div>
        <Typography variant="h4" className={classes.title} gutterBottom>
                    Reset Password
        </Typography>
        <Typography
          variant="caption"
          className={classes.subtitle}
          gutterBottom
          align="center"
        >
                    Please enter your mobile number
        </Typography>
        <section className={classes.formWrap}>
          <form onSubmit={handleSubmit}>
            <div>
              <FormControl className={classes.formControl}>
                <Field
                  name="mobile"
                  component={TextFieldRedux}
                  placeholder="Your Mobile No"
                  label="Your mobile no"
                  required
                  validate={[required]}
                  className={classes.field}
                />
              </FormControl>
            </div>
            <div className={classes.btnArea}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                                Next
                <ArrowForward
                  className={classNames(
                    classes.rightIcon,
                    classes.iconSmall
                  )}
                  disabled={submitting || pristine}
                />
              </Button>
            </div>
          </form>
        </section>
      </Paper>
    );
  }
}

ResetForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const ResetFormReduxed = reduxForm({
  form: 'immutableEResetFrm',
  enableReinitialize: true,
})(ResetForm);

const reducer = 'ui';
const RegisterFormMapped = connect(state => ({
  force: state,
  deco: state.getIn([reducer, 'decoration']),
}))(ResetFormReduxed);

export default withStyles(styles)(RegisterFormMapped);
