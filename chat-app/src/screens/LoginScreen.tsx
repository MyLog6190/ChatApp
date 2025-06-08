// BearThemeLoginScreen.tsx - 이미지 시안 기준으로 로고 및 버튼 크기 정밀 조정
import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo-white.png')} style={styles.logo} />

      <Text style={styles.welcomeText}>반가워요! 로그인 해주세요</Text>

      <TextInput
        placeholder="이메일을 입력하세요."
        placeholderTextColor="#B0885A"
        style={styles.input}
      />

      <TextInput
        placeholder="비밀번호를 입력하세요."
        placeholderTextColor="#B0885A"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.socialButtonRow}>
        <TouchableOpacity
          style={[styles.socialButton, {backgroundColor: '#FEE500'}]}>
          <Text style={styles.socialText}>카카오 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialButton, {backgroundColor: '#03C75A'}]}>
          <Text style={[styles.socialText, {color: '#fff'}]}>
            네이버 로그인
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.socialButton, {backgroundColor: '#000'}]}>
          <Text style={[styles.socialText, {color: '#fff'}]}>GitHub</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linkContainerButtons}>
        <TouchableOpacity>
          <Text style={styles.linkButtonText}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkButtonText}>아이디/비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
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
  input: {
    width: '100%',
    backgroundColor: '#FDEBD2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#6B3E26',
  },
  loginButton: {
    backgroundColor: '#D88A4D',
    borderRadius: 16,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialButtonRow: {
    width: '100%',
    gap: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  socialButton: {
    width: '32%',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  socialText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    includeFontPadding: false,
  },
  linkContainerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
  },
  linkButtonText: {
    fontSize: 14,
    color: '#6B3E26',
    fontWeight: 'bold',
  },
});
