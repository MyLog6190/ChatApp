import RequestDto from './request.dto';

export interface LoginRequest extends RequestDto {
  email: string;
  password: string;
}
