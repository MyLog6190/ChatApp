import {useMutation, UseMutationOptions, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {login, sendVerificationEmail, signup, verifyCode} from '../api/auth';
import {removeEncryptedStorage} from '../utils/encryptStorage';
import {removeHeader, setHeader} from '../utils/header';

type UseMuatatioinCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, Error, TVariables, unknown>,
  'mutationFn'
>;

export const useSignup = (mutationOprions?: UseMuatatioinCustomOptions) => {
  return useMutation({
    mutationFn: signup,
    ...mutationOprions,
    onSuccess: ({data}) => {
      console.log(data);
    },
    onError: err => {
      console.log(err);
    },
  });
};

export const useSendEmali = (mutationOprions?: UseMuatatioinCustomOptions) => {
  return useMutation({
    mutationFn: sendVerificationEmail,
    ...mutationOprions,
    onSuccess: ({data}) => {
      console.log(data);
    },
    onError: err => {
      console.error(err);
    },
  });
};

export const useVerifyCode = (mutationOprions?: UseMuatatioinCustomOptions) => {
  return useMutation({
    mutationFn: verifyCode,
    ...mutationOprions,
    onSuccess: ({data}) => {
      console.log(data);
      return data;
    },
    onError: err => {
      console.error(err);
    },
  });
};

export const useLogin = (mutationOprion?: UseMuatatioinCustomOptions) => {
  return useMutation({
    mutationFn: login,
    onSuccess: ({data}) => {
      if (!data) return;
      setHeader('Authorization', `Bearer ${data.accessToken}`);
    },
  });
};

export const useGetRefreshToken = () => {
  const {isSuccess, data, isError} = useQuery({
    queryKey: ['auth', 'getAccessToken'],
    staleTime: 1000 * 60 * 30 - 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 30 - 1000 * 60 * 3,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  const response = data as any;

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${response.getAccessToken}`);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      removeEncryptedStorage('refreshToken');
    }
  }, [isError]);

  return {isSuccess, isError};
};
