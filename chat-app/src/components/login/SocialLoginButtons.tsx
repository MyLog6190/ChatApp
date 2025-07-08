// components/SocialLoginButtons.tsx
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

export default function SocialLoginButtons() {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={[styles.button, {backgroundColor: '#FEE500'}]}>
        <Text style={styles.text}>카카오 로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, {backgroundColor: '#03C75A'}]}>
        <Text style={[styles.text, {color: '#fff'}]}>네이버 로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, {backgroundColor: '#000'}]}>
        <Text style={[styles.text, {color: '#fff'}]}>GitHub</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    gap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  button: {
    width: '32%',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
  },
});
