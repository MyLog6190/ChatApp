// components/SignupForm.tsx
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {zodResolver} from '@hookform/resolvers/zod';

const schema = z.object({
  email: z
    .string()
    .nonempty('이메일을 입력해 주세요.')
    .email('이메일 형식이 아닙니다.'),

  code: z.string().length(6),
});

type signupDate = z.infer<typeof schema>;

export default function SignupForm() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<signupDate>({resolver: zodResolver(schema), mode: 'onTouched'});

  return (
    <View style={styles.innerContainer}>
      <Image
        source={require('../../assets/logo-white.png')}
        style={styles.logo}
      />

      <Text style={styles.welcomeText}>회원가입을 진행해 주세요</Text>

      <View style={styles.inputRow}>
        <TouchableOpacity style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>인증 요청</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="인증 코드를 입력하세요."
          placeholderTextColor="#B0885A"
          keyboardType="number-pad"
          style={styles.flexInput}
        />
        <TouchableOpacity style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>확인</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="이름을 입력하세요."
        placeholderTextColor="#B0885A"
        style={styles.input}
      />

      <TextInput
        placeholder="비밀번호를 입력하세요."
        placeholderTextColor="#B0885A"
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="비밀번호를 다시 입력하세요."
        placeholderTextColor="#B0885A"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 20,
    color: '#6B3E26',
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    backgroundColor: '#FDEBD2',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#6B3E26',
    height: 48,
    marginBottom: 16,
  },
  flexInput: {
    flex: 1,
    backgroundColor: '#FDEBD2',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#6B3E26',
    height: 48,
  },
  signupButton: {
    backgroundColor: '#D88A4D',
    borderRadius: 14,
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 8,
    marginBottom: 16,
  },
  verifyButton: {
    backgroundColor: '#6B3E26',
    paddingHorizontal: 16,
    borderRadius: 10,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 90,
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});
