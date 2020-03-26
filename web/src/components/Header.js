import React from 'react';
import { Link } from 'react-router-dom';

import Notifications from './Notifications';

import logo2 from '../assets/logo2.svg';
import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo2} alt="" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />

          <Profile>
            <div>
              <strong>Diego Braga</strong>
              <Link to="/profile">My Profile</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/50/abott@adorable.png"
              alt="Diego Braga"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
