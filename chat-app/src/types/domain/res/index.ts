import ResponseDto from './response.dto';

export type ResponseBody<T> = T | ResponseDto | null;
