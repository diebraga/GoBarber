import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { Container, Logout } from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {}

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Your name" />
        <Input name="email" type="email" placeholder="Your address" />
        <hr />

        <Input type="password" name="password" placeholder="New password" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
        />

        <button type="submit">Update Profile</button>
      </Form>
      <Logout>
        <button type="button">Log Out</button>
      </Logout>
    </Container>
  );
}
