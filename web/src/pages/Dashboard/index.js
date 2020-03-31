import React, { useState, useMemo } from 'react';
import { format, subDays, addDays } from 'date-fns';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Container, Time } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());

  const dateFormated = useMemo(() => format(date, "d 'of' MMMM"), [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{dateFormated}</strong>
        <button type="button" onClick={handleNextDay}>
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
