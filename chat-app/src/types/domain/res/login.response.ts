import ResponseDto from './response.dto';

export interface LoginResponse extends ResponseDto {
  accessToken: string;
}
