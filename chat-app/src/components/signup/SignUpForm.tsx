// components/SignupForm.tsx
import {zodResolver} from '@hookform/resolvers/zod';
import React, {useState} from 'react';
import {Controller, useForm, useWatch} from 'react-hook-form';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {z} from 'zod';
import {EmailTypes} from '../../constants/email-types';
import {
  useSendEmali,
  useSignup,
  useVerifyCode,
} from '../../hooks/queries/useAuth';
import {usePopup} from '../../hooks/usePopup';
import {Popup} from '../Popup';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackList} from '../../types/navigation';
import {useNavigation} from '@react-navigation/native';

const signUpSchema = z
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

export const verifyCodeSchema = z.object({
  email: z
    .string()
    .nonempty('이메일을 입력해 주세요.')
    .email('이메일 형식이 아닙니다.'),
  code: z.string().length(6, '인증 코드는 6자리여야 합니다.'),
});

type signupDate = z.infer<typeof signUpSchema>;
type Navigation = StackNavigationProp<AuthStackList>;
export default function SignupForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<signupDate>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      code: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });
  const signupMutation = useSignup();
  const sendEmailMutation = useSendEmali();
  const verityCodeMutation = useVerifyCode();
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const {state, open, confirm, close} = usePopup();
  const navigation = useNavigation<Navigation>();

  const onSubmit = async (data: any) => {
    console.log(data);

    if (!isCodeVerified) {
      open('CODE_VERIFY_REQUIRED');
      return;
    }

    try {
      await signupMutation.mutateAsync(data);
      open('SUCCESS_SIGN_UP', {
        onConfirm: () => {
          console.log('[Parent] nav state:', navigation.getState());
          try {
            navigation.replace('Login');
            console.log('[Parent] replace called');
          } catch (e) {
            console.log('[Parent] replace error', e);
          }
        },
      });
    } catch (error: any) {
      console.log(error.response.data.code);

      open(error.response.data.code);
    }
  };

  const onInvalid = (error: any) => {
    console.log(error);
    if (error.email) {
      open('EMAIL_REQUIRED');
      return;
    }

    if (error.code) {
      open('CODE_REQUIRED');
      return;
    }

    if (error.name) {
      open('NAME_REQUIRED');
      return;
    }

    if (error.password) {
      open('PASSWORD_REQUIRED');
      return;
    }

    if (error.confirmPassword) {
      if (error.confirmPassword.message === '비밀번호가 일치하지 않습니다.') {
        open('PASSWORD_MISMATCH_CLIENT');
        return;
      }
      open('CONFIRM_PASSWORD_REQUIRED');
      return;
    }
  };

  const email = useWatch({
    control,
    name: 'email',
  });

  const code = useWatch({
    control,
    name: 'code',
  });

  const isValidEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const sendEmail = async (email: string, type: EmailTypes) => {
    if (!isValidEmail(email)) {
      open('INVALID_EMAIL');
      return;
    }

    try {
      const response = await sendEmailMutation.mutateAsync({email, type});
      console.log(response);
      open('EMAIL_SENT');
    } catch (error: any) {
      console.log(error.response.data.code);

      open(error.response.data.code);
    }
  };

  const verifyCode = async (email: string, code: string) => {
    try {
      const response = await verityCodeMutation.mutateAsync({
        email,
        code,
      });

      if (response.data.email !== email) {
        setError('email', {message: '인증 요청한 이메일이 아닙니다.'});
      }

      if (response.data.code !== code) {
        setError('code', {
          message: '인증 코드가 유효하지 않거나 만료되었습니다.',
        });
      }

      setIsCodeVerified(response.data.code === code);
    } catch (error: any) {
      console.log(error.response.data);
      if (error.response.data.code === 'AUTH_422') {
        setError('code', {
          message: error.response.data.message,
        });
      }
    }
  };

  return (
    <View style={styles.innerContainer}>
      <Popup
        visible={state.visible}
        variant={state.variant as 'success' | 'error' | 'info'}
        title={state.title}
        message={state.message}
        onClose={close}
        onConfirm={confirm}
      />

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
              editable={!isCodeVerified}
            />
            <TouchableOpacity
              style={styles.verifyButton}
              disabled={isCodeVerified}
              onPress={() => {
                sendEmail(email, EmailTypes.VERIFICATION);
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
              editable={!isCodeVerified}
            />
            <TouchableOpacity
              style={[
                styles.verifyButton,
                isCodeVerified && {backgroundColor: '#ccc'},
              ]}
              onPress={() => {
                verifyCode(email, code);
              }}
              disabled={isCodeVerified}>
              <Text
                style={[
                  styles.verifyButtonText,
                  isCodeVerified && {color: '#888'},
                ]}>
                {isCodeVerified ? '완료됨' : '확인'}
              </Text>
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
        onPress={handleSubmit(onSubmit, onInvalid)}>
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
