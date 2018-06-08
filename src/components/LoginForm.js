import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { withFormik } from 'formik';
import Yup from 'yup';

const LoginForm = ({ values, handleChange, handleSubmit, errors, touched, isSubmitting }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        {touched.username && errors.username && <p className="red">{errors.username}</p>}
        <Label for="username">Email</Label>
        <Input 
          type="text" 
          name="username"
          value={values.username}
          onChange={handleChange}
          id="username" 
          placeholder="Your user" 
        />
      </FormGroup>
      <FormGroup>
        {touched.password && errors.password && <p className="red">{errors.password}</p>}
        <Label for="password">Password</Label>
        <Input 
          type="password" 
          name="password"
          value={values.password}
          onChange={handleChange}
          id="password" 
          placeholder="Your secret password" 
        />
      </FormGroup>
      <Button color="primary" disabled={isSubmitting}>Submit</Button>
    </Form>
  );
}

const FormikApp = withFormik({
  mapPropsToValues({ username, password }) {
    return { username, password }
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().email().required('Email is required'),
    password: Yup.string().min(4, 'Password must be 4 characters or longer').required()
  }),
  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    if (values.username === 'adeel@io.com') {
      setErrors({ username: 'This is a dummy procedure error' });
    } else {
      props.onSubmit(values);
      resetForm();
      // setSubmitting(true);
    }
  },
  displayName: 'LoginForm{HOC}',
})(LoginForm);

export default FormikApp;