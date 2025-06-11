import {useMutation, UseMutationOptions} from '@tanstack/react-query';
import {signup} from '../api/auth';

type UseMuatatioinCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, Error, TVariables, unknown>,
  'mutationFn'
>;

// function useSignup(mutationOprions?: Omit<UseMuatatioinCustomOptions>) {
//   return useMutation({
//     mutationFn: signup,
//     ...mutationOprions,
//   });
// }
