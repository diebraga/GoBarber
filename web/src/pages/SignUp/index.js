import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';

import logo from '../../assets/logo.svg';

function SignIn() {
  return (
    <>
      <img src={logo} alt="Gobarber" />

      <Form>
        <Input type="text" placeholder="Name and Surname" />
        <Input type="email" placeholder="Your Email" />
        <Input type="password" placeholder="Your Password" />

        <button type="submit">Create Account</button>
        <Link to="/SignUp">I already have an account</Link>
      </Form>
    </>
  );
}

export default SignIn;
