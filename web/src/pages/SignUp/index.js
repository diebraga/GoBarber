import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

import { signUpRequest } from '../../store/modules/auth/actions';

// create schema validation
const schema = Yup.object().shape({
  name: Yup.string().required('Name required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email required'),
  password: Yup.string()
    .min(6)
    .required('Password required'),
});

function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubnmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="Gobarber" />

      <Form schema={schema} onSubmit={handleSubnmit}>
        <Input name="name" type="text" placeholder="Name and Surname" />
        <Input name="email" type="email" placeholder="Your Email" />
        <Input name="password" type="password" placeholder="Your Password" />

        <button type="submit">
          {loading ? 'Loading...' : 'Create Account'}
        </button>
        <Link to="/SignUp">I already have an account</Link>
      </Form>
    </>
  );
}

export default SignIn;
