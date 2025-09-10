import {useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {
  getAccessToken,
  getProfile,
  login,
  logout,
  sendVerificationEmail,
  signup,
  verifyCode,
} from '../../api/auth';
import queryClient from '../../api/quert-client';
import {ExpiredTime} from '../../constants/expired';
import {UseMutationCustomOptions, UseQueryCustomOption} from '../../types/api';
import {Profile} from '../../types/doamain';
import {
  removeEncryptedStorage,
  setEncryptedStorage,
} from '../../utils/encrypt-storage';
import {removeHeader, setHeader} from '../../utils/header';

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
      console.log(data);
      console.log(data.accessToken);
      console.log(data.refreshToken);

      if (!data) return;
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptedStorage('refreshToken', data.refreshToken);
      queryClient.fetchQuery({
        queryKey: ['auth', 'getAccessToken'],
        queryFn: getAccessToken, // ✅ 명시
      });
      return data;
    },
    onSettled: () => {
      queryClient.refetchQueries({queryKey: ['auth', 'getAccessToken']});
      queryClient.invalidateQueries({queryKey: ['auth', 'getProfile']});
      return;
    },
    onError: error => {
      console.log(error);
      removeHeader('Authziztion');
      removeEncryptedStorage('refreshToken');
    },
  });
};

export const useLogout = (mutationOprion?: UseMutationCustomOptions) => {
  removeHeader('Authorization');
  removeEncryptedStorage('refreshToken');
};

const useGetRefreshToken = () => {
  const {isSuccess, data, isError} = useQuery({
    queryKey: ['auth', 'getAccessToken'],
    queryFn: getAccessToken,
    staleTime: ExpiredTime.ACCESS_TOKEN,
    refetchInterval: ExpiredTime.ACCESS_TOKEN,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });

  const response = data as any;
  console.log(response);
  useEffect(() => {
    async () => {
      if (isSuccess) {
        setHeader('Authorization', `Bearer ${response}`);
        setEncryptedStorage('refreshToken', response);
      }
    };
  }, [isSuccess]);

  useEffect(() => {
    async () => {
      if (isError) {
        removeHeader('Authorization');
        removeEncryptedStorage('refreshToken');
      }
    };
  }, [isError]);

  return {isSuccess, isError};
};

const useGetProfile = (queryOptions?: UseQueryCustomOption<Profile>) => {
  return useQuery({
    queryKey: ['auth', 'getProfile'],
    queryFn: getProfile,
    ...queryOptions,
  });
};

export function useAuth() {
  // const loginMutation = useLogin();
  const refreshTokenQuery = useGetRefreshToken();
  const {data, isSuccess: isLogin} = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });
  console.log(isLogin);
  return {isLogin};
}
