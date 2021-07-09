import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import config from '../../../config/config';
import history from '../../../utils/history';
const Login = props => {
  const { classes } = props;
  const { enqueueSnackbar } = useSnackbar();
  // const [values, setValues] = useState([]);
  const title = brand.name + ' - Login';
  const description = brand.desc;
  const { baseApiUrl } = config;
  const login = async (email, password) => {
    try {
      const url = baseApiUrl + 'auth/login';
      const response = await axios.post(url, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return error.response ? error.response.data : error.message;
    }
  };

  const submitForm = async values => {
    // c; //onst { valueForm } = this.state;
    const email = values.get('email');
    const password = values.get('password');
    // const remember = values.get('remember');
    const response = await login(email, password);
    if (response.status && response.status === 200) {
      // login
      const { token } = response.data;
      // set in localstorage
      localStorage.setItem('token', token);
      enqueueSnackbar('Welcome to dashboard', {
        variant: 'success',
        autoHideDuration: 3000
      });
      history.push('/app');
      // window.location.href = '/app';
    } else {
      enqueueSnackbar(response.data.message, {
        variant: 'error',
        autoHideDuration: 3000
      });
    }
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
          <LoginForm onSubmit={values => submitForm(values)} />
        </div>
      </div>
    </div>
  );
};

// class Login extends React.Component {
//     state = {
//         valueForm: [],
//     };

//     submitForm(values) {
//         const { valueForm } = this.state;
//         console.log(values);
//         setTimeout(() => {
//             this.setState({ valueForm: values });
//             console.log(`You submitted:\n\n${valueForm}`);

//             console.log("valueForm.get('email')", values.get('email'));
//             // window.location.href = '/app';
//         }, 500); // simulate server latency
//     }

//     render() {
//         const title = brand.name + ' - Login';
//         const description = brand.desc;
//         const { classes } = this.props;
//         return (
//             <div className={classes.root}>
//                 <Helmet>
//                     <title>{title}</title>
//                     <meta name="description" content={description} />
//                     <meta property="og:title" content={title} />
//                     <meta property="og:description" content={description} />
//                     <meta property="twitter:title" content={title} />
//                     <meta
//                         property="twitter:description"
//                         content={description}
//                     />
//                 </Helmet>
//                 <div className={classes.container}>
//                     <div className={classes.userFormWrap}>
//                         <LoginForm
//                             onSubmit={values => this.submitForm(values)}
//                         />
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
