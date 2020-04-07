import React from 'react';
import {Image, Text} from 'react-native';

import Background from '../../components/background';
import logo from '../../assets/logo.png';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignText,
} from './styles';

export default function SignIn({navigation}) {
  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Your email"
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Your password"
          />

          <SubmitButton>Access</SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignText>Don't have an account?</SignText>
        </SignLink>
      </Container>
    </Background>
  );
}
