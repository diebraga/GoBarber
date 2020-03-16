import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';

import logo from '../../assets/logo.svg';

function SignIn() {
  return (
    <>
      <img src={logo} alt="Gobarber" />

      <Form>
        <Input name="email" type="email" placeholder="Your Email" />
        <Input name="password" type="password" placeholder="Your Password" />

        <button type="submit">Login</button>
        <Link to="/SignUp">Create Account</Link>
      </Form>
    </>
  );
}

export default SignIn;
