// screens/LoginScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LoginForm from '../components/login/LoginForm';
import SocialLoginButtons from '../components/login/SocialLoginButtons';
import LinkButtons from '../components/login/LinkButtonBottons';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo-white.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>반가워요! 로그인 해주세요</Text>

      <LoginForm />
      <SocialLoginButtons />
      <LinkButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 18,
    color: '#6B3E26',
    fontWeight: '600',
    marginBottom: 24,
  },
});
