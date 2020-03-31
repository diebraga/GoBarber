import React from 'react';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Container, Time } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <header>
        <button type="button">
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>31 of March</strong>
        <button type="button">
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>

      <ul>
        <Time past>
          <strong>09:00</strong>
          <span>Diego Braga</span>
        </Time>
        <Time avalible>
          <strong>10:00</strong>
          <span>Avalible</span>
        </Time>
        <Time>
          <strong>11:00</strong>
          <span>Diego Braga</span>
        </Time>
        <Time>
          <strong>12:00</strong>
          <span>Diego Braga</span>
        </Time>
      </ul>
    </Container>
  );
}
