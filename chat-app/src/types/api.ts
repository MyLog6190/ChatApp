import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export type UseMutationCustomOptions<
  TData = unknown,
  TVariables = unknown,
> = Omit<UseMutationOptions<TData, Error, TVariables, unknown>, 'mutationFn'>;

export type UseQueryCustomOption<
  TQueryFnData = unknown,
  TData = TQueryFnData,
> = Omit<
  UseQueryOptions<TQueryFnData, Error, TData, QueryKey>,
  'queryKey' | 'queryFn'
>;
