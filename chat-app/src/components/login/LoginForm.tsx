// components/LoginForm.tsx
import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {z} from 'zod';
import {useLogin} from '../../hooks/useAuth';

const schema = z.object({
  email: z
    .string()
    .nonempty('이메일을 입력해주세요.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().nonempty('비밀번호를 입력해 주세요.'),
});

type LoginData = z.infer<typeof schema>;

export default function LoginForm() {
  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginData>({resolver: zodResolver(schema), mode: 'onTouched'});

  const onSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  return (
    <View style={{width: '100%'}}>
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="이메일을 입력하세요."
            placeholderTextColor="#B0885A"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력하세요."
            placeholderTextColor="#B0885A"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  errorText: {
    color: '#D32F2F',
    marginTop: -12,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '500',
    paddingLeft: 4,
  },
});
