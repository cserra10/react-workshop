import {Formik} from 'formik'
import * as Yup from 'yup'
import {Box, Button, Card, CardContent, CardHeader, Divider, TextField} from '@material-ui/core'
import React from 'react'
import { useFirebase } from 'react-redux-firebase'
import { useHistory } from 'react-router-dom';

const Register = () => {
  const firebase = useFirebase();
  const functions = firebase.functions();
  // const createUser = functions.httpsCallable('createUser');
  const history = useHistory();

  const createUser = (values) => {
    fetch('http://localhost:5001/workshop-react-6239d/us-central1/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(values)
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        // firebase.login({ email: values.email, password: values.password })
        //   .then(response => {
        //     history.push('/dashboard')
        //   })
      });
  }

  return (
    <Formik
      initialValues={{firstName: '', lastName: '', email: '', password: ''}}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required('FirstName is required'),
        lastName: Yup.string().required('LastName is required'),
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().min(8).required('Password is required')
      })}
      onSubmit={(values, {
        setSubmitting,
        setErrors,
        setStatus
      }) => {
        createUser(values)
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
          <CardHeader title="Register" />
          <Divider />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Box m={2}>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  name="firstName"
                  label="FirstName:"
                  value={values.firstName}
                  onChange={handleChange}
                  helperText={touched.firstName && errors.firstName}
                  variant="outlined"
                />
              </Box>

              <Box m={2}>
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  name="lastName"
                  label="LastName:"
                  value={values.lastName}
                  onChange={handleChange}
                  helperText={touched.lastName && errors.lastName}
                  variant="outlined"
                />
              </Box>

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
                >Register</Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      )}
    </Formik>
  );
};

export default Register;
