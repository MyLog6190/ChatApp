import {UserRoles} from '../constants/user-roles.type';

type UserRoleType = UserRoles | '';

export interface Profile {
  email: string;
  name: string;
  role: UserRoleType;
  publicId: string;
}
