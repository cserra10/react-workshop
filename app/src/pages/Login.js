import {Formik} from 'formik'
import * as Yup from 'yup'
import {Box, Button, Card, CardContent, CardHeader, Divider, TextField} from '@material-ui/core'
import React from 'react'
import { useFirebase } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const firebase = useFirebase();
  const history = useHistory();

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().min(6).required('Password is required')
      })}
      onSubmit={(values, {
        setSubmitting,
        setErrors,
        setStatus
      }) => {
        firebase.login(values)
          .then((response) => {
            // Redirect to dashboard
            history.push('/dashboard');
          }).catch((e) => {
            console.error('error', e);
          });
      }}
    >
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
        <Card>
          <CardHeader title="Login" />
          <Divider />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Box m={2}>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  name="email"
                  type="email"
                  label="Email:"
                  value={values.email}
                  onChange={handleChange}
                  helperText={touched.email && errors.email}
                  variant="outlined"
                />
              </Box>

              <Box m={2}>
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  name="password"
                  type="password"
                  label="Password:"
                  value={values.password}
                  onChange={handleChange}
                  helperText={touched.password && errors.password}
                  variant="outlined"
                />
              </Box>

              <Box m={2}>
                <Button
                  type="submit"
                  variant="outlined"
                >Login</Button>
              </Box>

            </form>
          </CardContent>
        </Card>
      )}
    </Formik>
  );
};

export default Login;
