import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import {useEffect} from 'react';
import {
  getProfile,
  login,
  sendVerificationEmail,
  signup,
  verifyCode,
} from '../api/auth';
import {queryClient} from '../api/quert-client';
import {
  removeEncryptedStorage,
  setEncryptedStorage,
} from '../utils/encrypt-storage';
import {removeHeader, setHeader} from '../utils/header';

type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, Error, TVariables, unknown>,
  'mutationFn'
>;

export const useSignup = (mutationOprions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: signup,
    ...mutationOprions,
    onSuccess: ({data}: {data: any}) => {
      console.log(data);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
};

export const useSendEmali = (mutationOprions?: UseMutationCustomOptions) => {
  return useMutation({
    mutationFn: sendVerificationEmail,
    ...mutationOprions,
    onSuccess: ({data}: {data: any}) => {
      console.log(data);
    },
    onError: (err: any) => {
      console.error(err);
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
      const {message, code} = err.response.data;
      return {message, code};
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

type UseQueryCustomOption<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, Error, TData, QueryKey>,
  'queryKey' | 'queryFn'
>;

const useGetProfile = (queryOptions: UseQueryCustomOption) => {
  return useQuery({
    queryKey: ['auth', 'getProfile'],
    queryFn: getProfile,
    ...queryOptions,
  });
};
