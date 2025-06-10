import RequestDto from './request.dto';

export type RequestBody<T> = T | RequestDto | null;
