import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

// create schema validation
const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email required'),
  password: Yup.string().required('Password required'),
});

function SignIn() {
  function handleSubnmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="Gobarber" />

      <Form schema={schema} onSubmit={handleSubnmit}>
        <Input name="email" type="email" placeholder="Your Email" />
        <Input name="password" type="password" placeholder="Your Password" />

        <button type="submit">Login</button>
        <Link to="/SignUp">Create Account</Link>
      </Form>
    </>
  );
}

export default SignIn;
