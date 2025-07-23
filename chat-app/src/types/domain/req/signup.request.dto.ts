import RequestDto from './request.dto';

export interface SignupRequest extends RequestDto {
  email: string;
  password: string;
  name: string;
}
