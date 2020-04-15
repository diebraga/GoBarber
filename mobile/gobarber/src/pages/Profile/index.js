import React from 'react';
import {View} from 'react-native';

// import { Container } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/background';

export default function Profile() {
  return <Background />;
}

Profile.navigationOptions = {
  tabBarLabel: 'My profile',
  tabBarIcon: ({tintColor}) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
