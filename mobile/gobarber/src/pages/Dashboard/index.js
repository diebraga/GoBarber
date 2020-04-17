import React, {useEffect, useState} from 'react';
import api from '../../services/api';

import {Container, Title, List} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/background';
import Appointment from '../../components/Appointent';

export default function Dashboard() {
  const [appointments, seAppointments] = useState([]);

  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get('appointments');

      seAppointments(response.data);
    }

    loadAppointments();
  }, []);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    seAppointments.map((appointment) =>
      appointment.id === id
        ? {
            ...appointment,
            canceled_at: response.data.canceled_at,
          }
        : appointment,
    );
  }

  return (
    <Background>
      <Container>
        <Title>Appointments</Title>

        <List
          data={appointments}
          KeyExtrator={(item) => String(item.id)}
          renderItem={({item}) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Appointments',
  tabBarIcon: ({tintColor}) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
