// components/SignupForm.tsx
import React from 'react';
import {Controller, useForm, useWatch} from 'react-hook-form';
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
import {useSendEmali, useSignup} from '../../hooks/useAuth';
import {EmailType} from '../../constants/EmailType';

const schema = z
  .object({
    email: z
      .string()
      .nonempty('이메일을 입력해 주세요.')
      .email('이메일 형식이 아닙니다.'),
    code: z.string().length(6, '인증 코드는 6자리여야 합니다.'),
    name: z.string().nonempty('이름을 입력해 주세요.'),
    password: z
      .string()
      .nonempty('비밀번호를 입력해 주세요.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(32, '비밀번호는 최대 32자까지 가능합니다.'),
    confirmPassword: z
      .string()
      .nonempty('비밀번호를 다시 입력해 주세요.')
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(32, '비밀번호는 최대 32자까지 가능합니다.'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

type signupDate = z.infer<typeof schema>;

export default function SignupForm() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<signupDate>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      code: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  const signupMutate = useSignup();
  const sendEmailMutate = useSendEmali();

  const onSubmit = (data: any) => {
    console.log(data);
    signupMutate.mutate(data);
  };

  const email = useWatch({
    control,
    name: 'email',
  });

  const sendEmail = (email: string, type: EmailType) => {
    console.log(email);
    sendEmailMutate.mutate({email, type});
  };

  return (
    <View style={styles.innerContainer}>
      <Image
        source={require('../../assets/logo-white.png')}
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>회원가입을 진행해 주세요</Text>
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.inputRow}>
            <TextInput
              placeholder="이메일를 입력하세요."
              placeholderTextColor="#B0885A"
              style={styles.flexInput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={() => {
                sendEmail(email, EmailType.VERIFICATION);
              }}>
              <Text style={styles.verifyButtonText}>인증 요청</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        name="code"
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.inputRow}>
            <TextInput
              placeholder="인증 코드를 입력하세요."
              placeholderTextColor="#B0885A"
              keyboardType="number-pad"
              style={styles.flexInput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            <TouchableOpacity style={styles.verifyButton} onPress={() => {}}>
              <Text style={styles.verifyButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.code && (
        <Text style={styles.errorText}>{errors.code.message}</Text>
      )}

      <Controller
        control={control}
        name="name"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="이름을 입력하세요."
            placeholderTextColor="#B0885A"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}

      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="비밀번호를 입력하세요."
            placeholderTextColor="#B0885A"
            secureTextEntry
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <Controller
        control={control}
        name="confirmPassword"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="비밀번호를 다시 입력하세요."
            placeholderTextColor="#B0885A"
            secureTextEntry
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
      )}
      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSubmit(onSubmit)}>
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
  errorText: {
    color: '#D32F2F',
    marginTop: -12,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '500',
    paddingLeft: 4,
  },
});
