import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';

import logo from '../../assets/logo.svg';

function SignIn() {
  function handleSubnmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="Gobarber" />

      <Form onSubmit={handleSubnmit}>
        <Input name="text" type="text" placeholder="Name and Surname" />
        <Input name="email" type="email" placeholder="Your Email" />
        <Input name="password" type="password" placeholder="Your Password" />

        <button type="submit">Create Account</button>
        <Link to="/SignUp">I already have an account</Link>
      </Form>
    </>
  );
}

export default SignIn;
