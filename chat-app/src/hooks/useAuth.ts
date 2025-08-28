import {useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {login, sendVerificationEmail, signup, verifyCode} from '../api/auth';
import queryClient from '../api/quert-client';
import {getProfile} from '../api/user';
import {UseMutationCustomOptions, UseQueryCustomOption} from '../types/api';
import {
  removeEncryptedStorage,
  setEncryptedStorage,
} from '../utils/encrypt-storage';
import {removeHeader, setHeader} from '../utils/header';

export const useSignup = (mutationOprions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: signup,
    ...mutationOprions,
    onSuccess: ({data}: {data: any}) => {
      console.log(data);
      return data;
    },
    onError: (err: any) => {
      console.log(err);
      return err;
    },
  });
};

export const useSendEmali = (mutationOprions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: sendVerificationEmail,
    ...mutationOprions,
    onSuccess: ({data}: {data: any}) => {
      console.log(data);
      return data;
    },
    onError: (err: any) => {
      console.error(err.response.data);
      return err;
    },
  });
};

export const useVerifyCode = (mutationOprions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: verifyCode,
    ...mutationOprions,
    onSuccess: ({data}: {data: any}) => {
      console.log(data);
      return data;
    },
    onError: (err: any) => {
      console.log(err);
      const {message, code} = err.response.data;
      console.log(message, code);
      return err;
    },
  });
};

export const useLogin = (mutationOprion?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: login,
    onSuccess: ({data}: {data: any}) => {
      if (!data) return;

      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptedStorage('refreshToken', data.refreshToken);
    },
    onSettled: () => {
      queryClient.refetchQueries({queryKey: ['auth', 'getAccessToken']});
      queryClient.invalidateQueries({queryKey: ['auth', 'getProfile']});
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
      setEncryptedStorage('refreshToken', response.refreshToken);
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

const useGetProfile = (queryOptions: UseQueryCustomOption) => {
  return useQuery({
    queryKey: ['auth', 'getProfile'],
    queryFn: getProfile,
    ...queryOptions,
  });
};

function useAuth() {}
