import RequestDto from './request.dto';

export interface VerifyCodeRequest extends RequestDto {
  email: string;
  code: string;
}
