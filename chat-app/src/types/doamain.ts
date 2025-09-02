import {UserRoles} from '../constants/user-roles.type';

type UserRoleType = UserRoles | '';

export interface Profile {
  email: string;
  name: string;
  profile: string;
  role: UserRoleType;
  publicId: string;
}
