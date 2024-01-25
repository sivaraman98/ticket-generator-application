export interface IResponseObject<T> {
  status: 'SUCCESS' | 'ERROR';
  message: string;
  data?: T;
  warnings?: any[];
}

export function framedResponse<T>(
  status: 'SUCCESS' | 'ERROR',
  message: string,
  data?: T,
  warnings?: any[],
) {
  return {
    status,
    message,
    data,
    warnings,
  };
}
