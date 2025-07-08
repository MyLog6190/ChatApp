// components/LinkButtons.tsx
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default function LinkButtons() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.text}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.text}>아이디/비밀번호 찾기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 14,
    color: '#6B3E26',
    fontWeight: 'bold',
  },
});
