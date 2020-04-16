import React from 'react';

import {Container, Title, List} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/background';
import Appointment from '../../components/Appointent';
const data = [1, 2, 3, 4, 5];

export default function Dashboard() {
  return (
    <Background>
      <Container>
        <Title>Appointments</Title>

        <List
          data={data}
          KeyExtrator={(item) => String(item)}
          renderItem={({item}) => <Appointment data={item} />}
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
