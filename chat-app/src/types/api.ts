import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {ResponseBody} from './dto/res';

type ResponseError = AxiosError<ResponseBody<null>>;

export type UseMutationCustomOptions<
  TData = unknown,
  TVariables = unknown,
> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables, unknown>,
  'mutationFn'
>;

export type UseQueryCustomOption<
  TQueryFnData = unknown,
  TData = TQueryFnData,
> = Omit<
  UseQueryOptions<TQueryFnData, Error, TData, QueryKey>,
  'queryKey' | 'queryFn'
>;
