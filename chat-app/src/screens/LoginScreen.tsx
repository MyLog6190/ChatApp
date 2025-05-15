// LoginScreen.tsx (React Native with basic styling)
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Welcome Text */}
      <Text style={styles.title}>반가워요! 로그인 해주세요</Text>

      {/* Email Input */}
      <TextInput
        placeholder="이메일을 입력하세요"
        style={styles.input}
        placeholderTextColor="#9CA3AF"
      />

      {/* Password Input */}
      <TextInput
        placeholder="비밀번호를 입력하세요"
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#9CA3AF"
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      {/* Combined Links */}
      <View style={styles.linksContainerCombined}>
        <Text style={styles.linkText}>회원가입</Text>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.linkText}>아이디/비밀번호 찾기</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#111827',
  },
  loginButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linksContainerCombined: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
  },
  linkText: {
    fontSize: 14,
    color: '#1E3A8A',
    paddingHorizontal: 4,
  },
  separator: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});
