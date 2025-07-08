export interface ResponseDto {
  code: string;
  message: string;
}

export interface ResponseBody<T> extends ResponseDto {
  data: T | null;
}
