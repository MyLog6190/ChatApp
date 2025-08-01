// screens/SignupScreen.tsx
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import SignupForm from '../components/signup/SignUpForm';

export default function SignupScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <SignupForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF8F0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
});
